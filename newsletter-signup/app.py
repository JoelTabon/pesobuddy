from flask import Flask, request, render_template
import csv
import os
import re
from datetime import datetime

from flask_cors import CORS
CORS(app, resources={r"/subscribe": {"origins": "https://pesobuddy.com/"}})
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__)
CORS(app)

# Rate limiting: 5 signups per minute per IP
limiter = Limiter(get_remote_address, app=app, default_limits=["5 per minute"])

EMAIL_REGEX = re.compile(r"^[^@]+@[^@]+\.[^@]+$")

@app.route('/')
def index():
    subscribed = request.args.get('subscribed')
    return render_template('index.html', subscribed=subscribed)

@app.route('/subscribe', methods=['POST'])
@limiter.limit("5 per minute")
def subscribe():
    email = request.form.get('email')
    if not email or not EMAIL_REGEX.match(email):
        return '', 400  # Bad request if no or invalid email

    csv_path = os.path.join(os.path.dirname(__file__), 'subscribers.csv')
    file_exists = os.path.isfile(csv_path)
    # Ensure header exists if file is new or empty
    if not file_exists or os.path.getsize(csv_path) == 0:
        with open(csv_path, 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['email', 'signup_date'])

    # Check for duplicate
    with open(csv_path, 'r', newline='') as f:
        reader = csv.reader(f)
        header = next(reader, None)
        for row in reader:
            if row and row[0].strip().lower() == email.strip().lower():
                return 'duplicate', 409  # Conflict if duplicate

    signup_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    with open(csv_path, 'a', newline='') as f:
        writer = csv.writer(f)
        writer.writerow([email, signup_date])
    return '', 200  # Respond with 200 OK for AJAX

if __name__ == '__main__':
    app.run(debug=True)