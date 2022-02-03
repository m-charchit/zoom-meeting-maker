from flask import Flask, render_template, request
from main import getMessage
import json
app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")


@app.route("/create_meeting", methods=["POST"])
def create():
    if request.method == "POST":
        link1, link2 = getMessage()
        return json.dumps({"class10": link1, "class9": link2})


if __name__ == '__main__':
    app.run(debug=True)
