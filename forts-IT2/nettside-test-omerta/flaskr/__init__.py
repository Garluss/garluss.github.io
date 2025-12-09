from flask import Flask

app = Flask(__name__)

app.secret_key = '_test46'

@app.route("/")
def home():
    return "Hello"

if __name__ == '__main__':
    app.run(debug=True)