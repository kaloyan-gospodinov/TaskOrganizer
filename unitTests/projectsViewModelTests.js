$(function() {
  var loginUserOwnerOfOneProject = "svetlin@nakov.com";
  var loginPassOwnerOfOneProject = "password";

  var loginUserOwnerOfTwoProjects = "ipradev@gmail.com";
  var loginPassOwnerOfTwoProjects = "password";

  var loginUserParticipantInTwoProjects = "dimebag@darrell.com";
  var loginPassParticipantInTwoProjects = "password";  

  module("Project View Model tests");

  asyncTest("Test Projects View Model initial state", function(){
    $fixture = $("#qunit-fixture");
    $fixture.load('navigation.html', function(){
      var navigationViewModel = new NavigationViewModel("../ss/controller.php");
      $loginMail = $('#loginMail');
      $loginMail.val(loginUserOwnerOfOneProject);
      $loginPass = $('#loginPass');
      $loginPass.val(loginPassOwnerOfOneProject);
      navigationViewModel.login().done(function(){

        $fixture.load('projects.html', function(){
          var projectsViewModel = new ProjectsViewModel("../ss/controller.php");
          equal(projectsViewModel.serverUrl,"../ss/controller.php");
          equal(projectsViewModel.myProjects().length,0);
          equal(projectsViewModel.sideProjects().length,0);
          start();            
        });

      })
    });
  });

  asyncTest("Test Projects View Model current user Own projects array", function(){
    $fixture = $("#qunit-fixture");
    $fixture.load('navigation.html', function(){
      var navigationViewModel = new NavigationViewModel("../ss/controller.php");
      $loginMail = $('#loginMail');
      $loginMail.val(loginUserOwnerOfOneProject);
      $loginPass = $('#loginPass');
      $loginPass.val(loginPassOwnerOfOneProject);
      navigationViewModel.login().done(function(){

        $fixture.load('projects.html', function(){
          var projectsViewModel = new ProjectsViewModel("../ss/controller.php");
          projectsViewModel.getMyProjects().done(function(){
            equal(projectsViewModel.myProjects().length, 1, "We test for user with one project");
            start();            
          });
        });

      })
    });
  });

  asyncTest("Test Projects View Model current user sideProjects array", function(){
    $fixture = $("#qunit-fixture");
    $fixture.load('navigation.html', function(){
      var navigationViewModel = new NavigationViewModel("../ss/controller.php");
      $loginMail = $('#loginMail');
      $loginMail.val(loginUserOwnerOfTwoProjects);
      $loginPass = $('#loginPass');
      $loginPass.val(loginPassOwnerOfTwoProjects);
      navigationViewModel.login().done(function(){

        $fixture.load('projects.html', function(){
          var projectsViewModel = new ProjectsViewModel("../ss/controller.php");
          projectsViewModel.getSideProjects().done(function(){
            equal(projectsViewModel.sideProjects().length, 1, "We test for user with one side project");
            start();            
          });
        });

      })
    });
  });

  asyncTest("Test Projects View Model other user Own projects array", function(){
    $fixture = $("#qunit-fixture");
    $fixture.load('navigation.html', function(){
      var navigationViewModel = new NavigationViewModel("../ss/controller.php");
      $loginMail = $('#loginMail');
      $loginMail.val(loginUserOwnerOfOneProject);
      $loginPass = $('#loginPass');
      $loginPass.val(loginPassOwnerOfOneProject);
      navigationViewModel.login().done(function(){
        var otherUserId = navigationViewModel.currentUserID();
        navigationViewModel.logout().done(function(){

          $fixture.load('projects.html', function(){
            var projectsViewModel = new ProjectsViewModel("../ss/controller.php", otherUserId);
            projectsViewModel.getMyProjects().done(function(){
              equal(projectsViewModel.myProjects().length, 1, "We test for user with one project");
              start();            
            });
          });

        })

      })
    });
  });

  asyncTest("Test Projects View Model other user sideProjects array", function(){
    $fixture = $("#qunit-fixture");
    $fixture.load('navigation.html', function(){
      var navigationViewModel = new NavigationViewModel("../ss/controller.php");
      $loginMail = $('#loginMail');
      $loginMail.val(loginUserOwnerOfTwoProjects);
      $loginPass = $('#loginPass');
      $loginPass.val(loginPassOwnerOfTwoProjects);
      navigationViewModel.login().done(function(){
        var otherUserId = navigationViewModel.currentUserID();
        navigationViewModel.logout().done(function(){

          $fixture.load('projects.html', function(){
            var projectsViewModel = new ProjectsViewModel("../ss/controller.php", otherUserId);
            projectsViewModel.getSideProjects().done(function(){
              equal(projectsViewModel.sideProjects().length, 1, "We test for user with one project");
              start();            
            });
          });

        })

      })
    });
  });
  
  asyncTest("Test Projects View Model dom manipulation Own projects", function(){
    $fixture = $("#qunit-fixture");
    $fixture.load('navigation.html', function(){
      var navigationViewModel = new NavigationViewModel("../ss/controller.php");
      $loginMail = $('#loginMail');
      $loginMail.val(loginUserOwnerOfTwoProjects);
      $loginPass = $('#loginPass');
      $loginPass.val(loginPassOwnerOfTwoProjects);
      navigationViewModel.login().done(function(){

        $fixture.load('projects.html', function(){
          var projectsViewModel = new ProjectsViewModel("../ss/controller.php");
          projectsViewModel.getMyProjects().done(function(){
            ko.applyBindings(projectsViewModel, document.getElementById('userProjects'));
            $projectsItems = $('#myProjectsView ul li');
            equal($projectsItems.length, projectsViewModel.myProjects().length);
            start();   
          });         
        });

      })
    });
  });
  
  asyncTest("Test Projects View Model dom manipulation Partisipant projects", function(){
    $fixture = $("#qunit-fixture");
    $fixture.load('navigation.html', function(){
      var navigationViewModel = new NavigationViewModel("../ss/controller.php");
      $loginMail = $('#loginMail');
      $loginMail.val(loginUserParticipantInTwoProjects);
      $loginPass = $('#loginPass');
      $loginPass.val(loginPassParticipantInTwoProjects);
      navigationViewModel.login().done(function(){

        $fixture.load('projects.html', function(){
          var projectsViewModel = new ProjectsViewModel("../ss/controller.php");
          projectsViewModel.getSideProjects().done(function(){
            ko.applyBindings(projectsViewModel, document.getElementById('userProjects'));
            $projectsItems = $('#sideProjectsView ul li');
            equal($projectsItems.length, projectsViewModel.sideProjects().length);
            start();   
          });         
        });

      })
    });
  });
});