$(function() {
  var loginCorrectUser = "svetlin@nakov.com";
  var loginCorrectPass = "password";

  module("Navigation View Model tests");

  asyncTest("Test Navigation View Model initial state", function(){
    $fixture = $("#qunit-fixture");
    $fixture.load('navigation.html', function(){
      var navigationViewModel = new NavigationViewModel("../ss/controller.php");
      equal(navigationViewModel.serverUrl,"../ss/controller.php");
      equal(navigationViewModel.pages[0],'projects');
      equal(navigationViewModel.pages[1],'calendar');
      equal(navigationViewModel.currentUserID(),false);
      start();
    });
  });

  asyncTest("Test loginMail and loginPass fields after login and currentUserID data", function(){
    $fixture = $("#qunit-fixture");
    $fixture.load('navigation.html', function(){
      var navigationViewModel = new NavigationViewModel("../ss/controller.php");
      $loginMail = $('#loginMail');
      $loginMail.val(loginCorrectUser);
      $loginPass = $('#loginPass');
      $loginPass.val(loginCorrectPass);
      navigationViewModel.login().done(function(){
        equal($loginMail.val(),'');
        equal($loginPass.val(),'');
        notEqual(navigationViewModel.currentUserID(),false);
        start();
      })
    });
  });

  asyncTest("Test logout after login and currentUserID data", function(){
    $fixture = $("#qunit-fixture");
    $fixture.load('navigation.html', function(){
      var navigationViewModel = new NavigationViewModel("../ss/controller.php");
      $loginMail = $('#loginMail');
      $loginMail.val(loginCorrectUser);
      $loginPass = $('#loginPass');
      $loginPass.val(loginCorrectPass);
      navigationViewModel.login().done(function(){
        navigationViewModel.logout().done(function(){
          equal(navigationViewModel.currentUserID(),false);
          start();
        })
      })
    });
  });

  /*asyncTest("Test attachPopover", function(){
    $fixture = $("#qunit-fixture");
    $fixture.load('navigation.html', function(){
      var navigationViewModel = new NavigationViewModel("../ss/controller.php");
      $loginBtn = $('#loginBtn');
      equal($.prototype.popover,false);
      start();
    });
  });*/
});