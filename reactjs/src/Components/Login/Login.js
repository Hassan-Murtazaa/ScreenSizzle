import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { TweenLite, Circ } from "gsap";
import back from './7.png';
import './Login.css'
import axios from "axios";
import PrivateRoutes from '../PrivRoute/PrivateRoutes';

export default function Login() {

  const [username, setUsername] = useState("");
  const [loginEmail, set_loginEmail] = useState("");
  const [loginPassword, set_loginPassword] = useState("");
  const [signupEmail, set_signupEmail] = useState("");
  const [signupPassword, set_signupPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleUsername(event) {
    setUsername(event.target.value);
  }

  function handle_loginEmail(event) {
    set_loginEmail(event.target.value);
  }

  function handle_signupEmail(event) {
    set_signupEmail(event.target.value);
  }

  function handle_loginPassword(event) {
    set_loginPassword(event.target.value);
  }

  function handle_signupPassword(event) {
    set_signupPassword(event.target.value);
  }

  function handleSubmitSignUp(event) {
    event.preventDefault();

    // username, email, password
    // Make a POST request to the server
    axios.post('http://localhost:3000/submitSignUp', {
      username: username,
      email: signupEmail,
      password: signupPassword,
    })
      .then(function (response) {
        console.log(response);
        var para1 = document.getElementById("signup_Error");

        para1.innerHTML = "Successfully signed up!";
        para1.style.display = "inline-block";
        para1.style.color = "#008000";
        para1.style.fontSize = "14px";

        setUsername("");
        set_signupEmail("");
        set_signupPassword("");
      })
      .catch(function (error) {
        console.log(error);

        var para1 = document.getElementById("signup_Error");

        if (para1.style.display == "inline-block") {
          para1.style.display = "none";
        }

        alert("Error posting data");
      });
  }

  function handleSubmitLogin(event) {
    event.preventDefault();

    // Make a POST request to the server
    axios.post('http://localhost:3000/submitLogin', {
      email: loginEmail,
      password: loginPassword,
    })
      .then(function (response) {
        console.log(response);
        var para = document.getElementById("login_Error");

        if (para.style.display == "inline-block") {
          para.style.display = "none";
        }

        setIsLoggedIn(true);
      })
      .catch(function (error) {
        console.log(error);
        var para = document.getElementById("login_Error");

        para.innerHTML = "* User not found!";
        para.style.display = "inline-block";
        para.style.color = "red";
        para.style.fontSize = "14px";
      });
  }

  function handleLabelClick() {
    var p = document.getElementById("signup_Error");

    if (p.style.display == "inline-block") {
      p.style.display = "none";
    }
  }

  useEffect(() => {

    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.overflow = 'hidden';
    document.body.style.minHeight = '100vh';
    document.body.style.backgroundImage = `url(${back})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    document.body.style.fontFamily = 'Verdana, Geneva, Tahoma, sans-serif';

    (function () {
      var width,
        height,
        largeHeader,
        canvas,
        ctx,
        points,
        target,
        animateHeader = true;

      // Main
      initHeader();
      initAnimation();
      addListeners();

      function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = { x: width / 2, y: height / 2 };

        largeHeader = document.getElementById("large-header");
        largeHeader.style.height = height + "px";

        canvas = document.getElementById("demo-canvas");
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext("2d");

        // create points
        points = [];
        for (var x = 0; x < width; x = x + width / 20) {
          for (var y = 0; y < height; y = y + height / 20) {
            var px = x + (Math.random() * width) / 20;
            var py = y + (Math.random() * height) / 20;
            var p = { x: px, originX: px, y: py, originY: py };
            points.push(p);
          }
        }

        // for each point find the 5 closest points
        for (var i = 0; i < points.length; i++) {
          var closest = [];
          var p1 = points[i];
          for (var j = 0; j < points.length; j++) {
            var p2 = points[j];
            if (!(p1 == p2)) {
              var placed = false;
              for (var k = 0; k < 5; k++) {
                if (!placed) {
                  if (closest[k] == undefined) {
                    closest[k] = p2;
                    placed = true;
                  }
                }
              }

              for (var k = 0; k < 5; k++) {
                if (!placed) {
                  if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                    closest[k] = p2;
                    placed = true;
                  }
                }
              }
            }
          }
          p1.closest = closest;
        }

        // assign a circle to each point
        for (var i in points) {
          var c = new Circle(
            points[i],
            2 + Math.random() * 2,
            "rgba(255,255,255,0.3)"
          );
          points[i].circle = c;
        }
      }

      // Event handling
      function addListeners() {
        if (!("ontouchstart" in window)) {
          window.addEventListener("mousemove", mouseMove);
        }
        window.addEventListener("scroll", scrollCheck);
        window.addEventListener("resize", resize);
      }

      function mouseMove(e) {
        var posy = 0;
        var posx = 0;
        if (e.pageX || e.pageY) {
          posx = e.pageX;
          posy = e.pageY - 100;
        } else if (e.clientX || e.clientY) {
          posx =
            e.clientX +
            document.body.scrollLeft +
            document.documentElement.scrollLeft;
          posy =
            e.clientY +
            document.body.scrollTop +
            document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
      }

      function scrollCheck() {
        if (document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
      }

      function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height + "px";
        canvas.width = width;
        canvas.height = height;
      }

      // animation
      function initAnimation() {
        animate();
        for (var i in points) {
          shiftPoint(points[i]);
        }
      }

      function animate() {
        if (animateHeader) {
          ctx.clearRect(0, 0, width, height);
          for (var i in points) {
            // detect points in range
            if (Math.abs(getDistance(target, points[i])) < 4000) {
              points[i].active = 0.3;
              points[i].circle.active = 0.6;
            } else if (Math.abs(getDistance(target, points[i])) < 20000) {
              points[i].active = 0.1;
              points[i].circle.active = 0.3;
            } else if (Math.abs(getDistance(target, points[i])) < 40000) {
              points[i].active = 0.02;
              points[i].circle.active = 0.1;
            } else {
              points[i].active = 0;
              points[i].circle.active = 0;
            }

            drawLines(points[i]);
            points[i].circle.draw();
          }
        }
        requestAnimationFrame(animate);
      }

      function shiftPoint(p) {
        TweenLite.to(p, 1 + 1 * Math.random(), {
          x: p.originX - 50 + Math.random() * 100,
          y: p.originY - 50 + Math.random() * 100,
          ease: Circ.easeInOut,
          onComplete: function () {
            shiftPoint(p);
          }
        });
      }

      // Canvas manipulation
      function drawLines(p) {
        if (!p.active) return;
        for (var i in p.closest) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.closest[i].x, p.closest[i].y);
          ctx.strokeStyle = "rgba(156,217,249," + p.active + ")";
          ctx.stroke();
        }
      }

      function Circle(pos, rad, color) {
        var _this = this;

        // constructor
        (function () {
          _this.pos = pos || null;
          _this.radius = rad || null;
          _this.color = color || null;
        })();

        this.draw = function () {
          if (!_this.active) return;
          ctx.beginPath();
          ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
          ctx.fillStyle = "rgba(156,217,249," + _this.active + ")";
          ctx.fill();
        };
      }

      // Util
      function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
      }
    })();

    // code from the script goes here
  }, []);

  if (isLoggedIn) {

    document.body.style.display = null;
    document.body.style.justifyContent = null;
    document.body.style.alignItems = null;
    document.body.style.overflow = null;
    document.body.style.minHeight = null;
    document.body.style.backgroundImage = null;
    document.body.style.backgroundSize = null;
    document.body.style.backgroundRepeat = null;
    document.body.style.backgroundPosition = null;
    document.body.style.fontFamily = null;
    return <PrivateRoutes />;
  }

  return (

    <div id="large-header" className='login-page'>
      <canvas id="demo-canvas">  </canvas>
      <div className="main" >
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div class="signup">
          <form>
            <label for="chk" aria-hidden="true" onClick={handleLabelClick}>Sign up</label>
            <input type="text" name="txt" placeholder="User name" required=""
              value={username}
              onChange={handleUsername} />
            <input type="email" name="email" placeholder="Email" required=""
              value={signupEmail}
              onChange={handle_signupEmail} />
            <input type="Password" name="pswd" placeholder="Password" required=""
              value={signupPassword}
              onChange={handle_signupPassword} />
            <p id="signup_Error" style={{ display: 'none' }}></p>
            <button id="SignupButton" onClick={handleSubmitSignUp}>Sign up</button>
          </form>
        </div>
        <div class="login">
          <form action="">
            <label for="chk" aria-hidden="true" onClick={handleLabelClick}>Login</label>
            <input type="email" name="email" placeholder="Email" required=""
              value={loginEmail}
              onChange={handle_loginEmail} />
            <input type="Password" name="pswd" placeholder="Password" required=""
              value={loginPassword}
              onChange={handle_loginPassword} />
            <p id="login_Error" style={{ display: 'none' }}></p>
            <button onClick={handleSubmitLogin} >Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}