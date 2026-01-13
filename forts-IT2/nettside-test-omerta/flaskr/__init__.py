from flask import Flask, render_template

app = Flask(__name__)

app.secret_key = '_test46'

@app.route("/")
def home():
    return render_template("hjem.html")

@app.route("/mer")
def mer():
    return render_template("omoss.html")

@app.route("/laiver")
def laiver():
    return render_template("laiver.html")

@app.route("/laiver/both")
def both():
    return render_template("both.html")

@app.route("/kontakt")
def kontakt():
    return render_template("kontakt.html")

if __name__ == '__main__':
    app.run(debug=True)