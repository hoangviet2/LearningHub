
from flask import Flask, render_template, request
import sqlite3

app = Flask(__name__)

@app.route('/')
def register():
    return render_template("/register.html")

@app.route('/login')
def login():
    return render_template("/login.html")


@app.route('/register', methods=['GET', 'POST'])
def registerform():
    message = ''
    if request.method == 'POST' \
        and 'username' in request.form \
        and 'password' in request.form:

        userName = request.form['username']
        password = request.form['password']

        sqliteConnection = sqlite3.connect('web_DB.db')
        cursor = sqliteConnection.cursor()
        print("Connected to SQLite")

        sqlite_select_query = "SELECT * from users where username=?"
        cursor.execute(sqlite_select_query,[userName])
        records = cursor.fetchall()
        if(len(records)>0):
            print("user đã tồn tai")
        else:
            cursor.execute(
                'INSERT INTO users(username,Password) VALUES (?,?)',
                [userName,password])

            print("You have successfully registered !")
    else:
        print("invalid data")

if __name__ == '__main__':
    app.run(debug=True)