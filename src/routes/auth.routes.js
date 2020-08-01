module.exports = function (app, passport) {
  app.get("/", function (req, res) {
    res.render("index.ejs");
  });

  app.get("/signin", function (req, res) {
    res.render("signin.ejs");
  });

  app.post(
    "/signin",
    passport.authenticate("local-login", {
      successRedirect: "/admin",
      failureRedirect: "signin",
      failureFlash: true,
    }),
    function (req, res) {
      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3;
      } else {
        req.session.cookie.expires = false;
      }
      res.redirect("/");
    }
  );

  app.get("/signup", function (req, res) {
    res.render("signup.ejs");
  });

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/signin",
      failureRedirect: "/signup",
      failureFlash: true,
    })
  );

  app.get("/admin", isLoggedIn, function (req, res) {
    res.render("/admin/index.ejs", {
      user: req.user,
    });
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/");
}
