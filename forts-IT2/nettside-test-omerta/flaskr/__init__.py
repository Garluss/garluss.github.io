from flask import Flask, render_template

app = Flask(__name__)

app.secret_key = '_test46'

@app.route("/")
def home():
    return render_template("hjem.html")

if __name__ == '__main__':
    app.run(debug=True)