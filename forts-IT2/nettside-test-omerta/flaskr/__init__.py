from flask import Flask, render_template
import uuid
import os

app = Flask(__name__)

app.secret_key = uuid.uuid4().hex

@app.route("/")
def home():
    try:
        with open("static/nestelaiv/info.json", encoding='utf-8') as f:
            innhold = f.read()
    except FileNotFoundError:
        innhold = '{"navn":"Ingen kommende laiv."}'
    return render_template("hjem.html", info=innhold)

@app.route("/mer")
def mer():
    return render_template("omoss.html")

@app.route("/laiver")
def laiver():
    return render_template("laiver.html")

@app.route("/laiver/neste")
def neste():
    try:
        with open("static/nestelaiv/info.json", encoding='utf-8') as f:
            innhold = f.read()
    except FileNotFoundError:
        innhold = '{"navn":"Ingen kommende laiv."}'
    return render_template("neste.html", info=innhold)

@app.route("/laiver/both")
def both():
    return render_template("both.html")

@app.route("/laiver/2025")
def div25():
    return render_template("div25.html")

@app.route("/kontakt")
def kontakt():
    return render_template("kontakt.html")

if __name__ == '__main__':
    app.run(debug=False)