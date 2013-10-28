<?php
    
    require('session.php');
    require('gravatar.php');

    if (isset($_REQUEST['action'])) {
        $response = array();

        switch($_REQUEST['action']) {

            case 'register':
                $result = register($_REQUEST);
                if ($result) {
                    $response['success'] = true;
                    $response['message'] = 'Congratulations ' .
                        $_REQUEST["name"] . ' you are now registerd!';
                } else {
                    $response['error'] = true;
                    $response['message'] = 'Oops.. This email is already registered..';
                }
                break;

            case 'login':
                $result = login($_REQUEST);

                if ($result) {
                    $response['success'] = true;
                    $response['userid'] = $result;
                    setSessionField('userid', $result);
                } else {
                    $response['error'] = true;
                    $response['userid'] = null;
                }
                break;

            case 'logout':
                $result = logout();

                if ($result) {
                    $response['success'] = true;
                    $response['message'] = 'Session destroyed.';
                } else {
                    $response['error'] = true;
                    $response['message'] = 'Oops.. ' .
                        'There was a problem destroying the session..';
                }
                break;

            case 'addProject':
                $result = addProject($_REQUEST);

                if ($result) {
                    $response['success'] = true;
                    $response['message'] = 'Project ' .
                        $_REQUEST["title"] . ' is now added!';
                } else {
                    $response['error'] = true;
                    $response['message'] = 'Oops.. ' .
                        'Project ' .
                        $_REQUEST["title"] .
                        ' already exists..';
                }
                break;

            case 'addTask':
                $result = addTask($_REQUEST);
                if ($result) {
                    $response['success'] = true;
                    $response['message'] = 'Task ' .
                        $_REQUEST["title"] . ' is now added!';
                } else {
                    $response['error'] = true;
                    $response['message'] = 'Oops.. ' .
                        'There was a problem adding your project';
                }
                break;

            case 'addParticipant':
                $data = addParticipant($_REQUEST);
                if ($data != null) {
                    $response['success'] = true;
                    $response['message'] = "You've successfully added " .
                        $_REQUEST['email'] . '..';
                } else {
                    $response['error'] = true;
                    $response['message'] = 'Oops.. No such user..';
                }
                break;

            case 'getCurrentUserId':
                $user = getSessionField('userid');
                if ($user != null) {
                    $response['success'] = true;
                    $response['data'] = $user;
                } else {
                    $response['error'] = true;
                    $response['data'] = null;
                }
                break;

            case 'getCurrentUserInfo':
                $data = getUser($_REQUEST);
                if ($data != null) {
                    $response['success'] = true;
                    $response['data'] = $data;
                } else {
                    $response['error'] = true;
                    $response['data'] = null;
                }
                break;

            case 'getUser':
                $data = getUser($_REQUEST);
                if ($data != null) {
                    $response['success'] = true;
                    $response['data'] = $data;
                } else {
                    $response['error'] = true;
                    $response['data'] = null;
                }
                break;

            case 'getProject':
                $data = getProject($_REQUEST);
                if ($data != null) {
                    $response['success'] = true;
                    $response['data'] = $data;
                } else {
                    $response['error'] = true;
                    $response['data'] = null;
                }
                break;

            case 'getUserProjects':
                $data = getUserProjects($_REQUEST);
                if ($data != null) {
                    $response['success'] = true;
                    $response['data'] = $data;
                } else {
                    $response['error'] = true;
                    $response['data'] = null;
                }
                break;

            case 'getUsersByProject':
                $data = getUsersByProject($_REQUEST);
                if ($data != null) {
                    $response['success'] = true;
                    $response['data'] = $data;
                } else {
                    $response['error'] = true;
                    $response['data'] = null;
                }
                break;

            case 'getProjectsByUser':
                $data = getProjectsByUser($_REQUEST);
                if ($data != null) {
                    $response['success'] = true;
                    $response['data'] = $data;
                } else {
                    $response['error'] = true;
                    $response['data'] = null;
                }
                break;

            case 'getAllTasksByProject':
                $data = getAllTasksByProject($_REQUEST);
                if ($data != null) {
                    $response['success'] = true;
                    $response['data'] = $data;
                } else {
                    $response['error'] = true;
                    $response['data'] = null;
                }
                break;

            case 'getAllTasksByUser':
                $data = getAllTasksByUser($_REQUEST);
                if ($data != null) {
                    $response['success'] = true;
                    $response['data'] = $data;
                } else {
                    $response['error'] = true;
                    $response['data'] = null;
                }
                break;

            case 'getAllUsers':
                $data = getAllUsers($_REQUEST);
                if ($data != null) {
                    $response['success'] = true;
                    $response['data'] = $data;
                } else {
                    $response['error'] = true;
                    $response['data'] = null;
                }
                break;
                
            case 'getAllProjects':
                $data = getAllProjects($_REQUEST);
                if ($data != null) {
                    $response['success'] = true;
                    $response['data'] = $data;
                } else {
                    $response['error'] = true;
                    $response['data'] = null;
                }
                break;
        }

        $encoded = json_encode($response);
        header('Content-type: application/json');
        exit($encoded); 
    }

    function register($request) {
        $name = $request['name'];
        $email = $request['email'];
        $password = $request['password'];
        $description = $request['description'];

        $db = new SQLite3("melondb.db3");
        $tablename = "users";
        $password = md5($password);

        // User record existence check
        $query = "SELECT * FROM $tablename WHERE (email = '$email')";
        if ($db -> querySingle($query)) {
            return false;
        }

        if ($description) {
            $query = "INSERT INTO $tablename(name, password, email, description)
                    VALUES ('$name', '$password', '$email', '$description')";
        } else {
            $query = "INSERT INTO $tablename(name, password, email)
                    VALUES ('$name', '$password', '$email')";
        }
        
        $result = $db -> exec($query);
        return true;
    }

    function login($request) {
        $email = $request['email'];
        $password = $request['password'];
        $db = new SQLite3("melondb.db3");
        $tablename = "users";
        $password = md5($password);

        $query = "SELECT * FROM $tablename 
            WHERE (email = '$email')
            AND (password = '$password')";
        $result = $db -> querySingle($query);

        if ($result) {
            return $result;
        }

        return false;
    }

    function logout() {
        return session_destroy();
    }

    function addProject($request) {
        $owner_id = $request['owner'];
        $title = $request['title'];
        $description = $request['description'];

        $db = new SQLite3("melondb.db3");
        $tablename = "projects";

        $query = "SELECT * FROM $tablename WHERE (title = '$title')";
        $result = $db -> querySingle($query);

        if ($result) {
            return false;
        }

        if ($description) {
            $query = "INSERT INTO $tablename(owner_id, title, description)
                VALUES ('$owner_id', '$title', '$description')";   
        } else {
            $query = "INSERT INTO $tablename(owner_id, title)
                VALUES ('$owner_id', '$title')";
        }

        $result = $db -> exec($query);
        return true;
    }

    function addParticipant($request) {
        $pid = $request['pid'];
        $email = $request['email'];
        $db = new SQLite3("melondb.db3");

        $tablename = "users";
        $query = "SELECT * FROM $tablename WHERE (email = '$email')";
        $result = $db -> query($query);
        $result = $result -> fetchArray();
        $uid = $result['id'];
        if (!$uid) {
            return false;
        }

        $tablename = "projects_users";
        $query = "SELECT * FROM $tablename WHERE (project_id = '$pid' AND user_id = '$uid')";
        $result = $db -> querySingle($query);
        if ($result) {
            return true;
        }

        $query = "INSERT INTO $tablename(project_id, user_id)
            VALUES ('$pid', '$uid')";   

        $result = $db -> exec($query);
        return true;
    }

    function addTask($request)
    {
        $project_id = $request['project_id'];
        $user_id = isset($request['user_id']) ?
             $request['user_id'] :
             $_SESSION['userid'];
        $status = $request['status'];
        $title = $request['title'];
        $description = $request['description'];
        $startdate = $request['startdate'];
        $enddate = $request['enddate'];

        $db = new SQLite3("melondb.db3");
        $tablename = "tasks";

        $query = "INSERT INTO $tablename(project_id, user_id, status, title, description, startdate, enddate)
                    VALUES ('$project_id', '$user_id', '$status', '$title', '$description', '$startdate', '$enddate')";
        $result = $db -> exec($query);

        return true;
    }

    function getUser($request) {
        $uid = isset(
            $request['id']) ?
            $request['id'] :
            $_SESSION['userid'];

        $avatarSize = isset($request['avatarSize']) ? 
            $request['avatarSize'] :
            96;

        $db = new SQLite3("melondb.db3");
        $query = "SELECT * FROM users WHERE (id = $uid)";
        $result = $db -> query($query);
        $result = $result -> fetchArray();

        $user = array(
            'id' => $result['id'],
            'name' => $result['name'],
            'email' => $result['email'],
            'avatar' => get_gravatar($result['email'], $avatarSize),
            'description' => $result['description']
        );

        return $user;
    }

    function getProject($request) {
        if (!isset($request['id'])) {
            return null;
        }

        $db = new SQLite3("melondb.db3");
        $pid = $request['id'];
        $query = "SELECT * FROM projects WHERE (id = $pid)";
        $result = $db -> query($query);
        $result = $result -> fetchArray();

        $project = array(
            'id' => $result['id'],
            'owner' => $result['owner_id'],
            'title' => $result['title'],
            'description' => $result['description']
        );

        return $project;
    }

    function getUserProjects($request) {
        $uid = isset(
            $request['id']) ?
            $request['id'] :
            $_SESSION['userid'];

        $db = new SQLite3("melondb.db3");
        $query = "SELECT * FROM projects WHERE owner_id = $uid";
        $result = $db -> query($query);

        $projects = array();
        while ($row = $result -> fetchArray()) {
            $projects[] = array(
                'id' => $row['id'],
                'owner' => $row['owner_id'],
                'title' => $row['title'],
                'description' => $row['description']
            );
        }

        return $projects;
    }

    function getUsersByProject($request) {
        if (!isset($request['id'])) {
            return null;
        }

        $db = new SQLite3("melondb.db3");
        $pid = $request['id'];
        $avatarSize = isset(
            $request['avatarSize']) ? 
            $request['avatarSize'] :
            96;

        $query = "SELECT users.id, users.name, users.email, users.password, users.description
                FROM projects, users
                INNER JOIN projects_users
                ON projects.id = projects_users.project_id
                AND projects_users.user_id = users.id
                WHERE projects.id = $pid";
        $result = $db -> query($query);

        $users = array();
        while ($row = $result->fetchArray()) {
            $users[] = array(
                'id' => $row['id'],
                'name' => $row['name'],
                'email' => $row['email'],
                'avatar' => get_gravatar($row['email'], $avatarSize),
                'description' => $row['description']
            );
        }

        return $users;
    }

    function getProjectsByUser($request) {
        $uid = isset(
            $request['id']) ?
            $request['id'] :
            $_SESSION['userid'];

        $db = new SQLite3("melondb.db3");
        $query = "SELECT projects.id, projects.owner_id, projects.title, projects.description
                FROM projects, users
                INNER JOIN projects_users
                ON projects.id = projects_users.project_id
                AND projects_users.user_id = users.id
                WHERE users.id = $uid";

        $result = $db -> query($query);
        $projects = array();
        while ($row = $result -> fetchArray()) {
            $projects[] = array(
                'id' => $row['id'],
                'owner' => $row['owner_id'],
                'title' => $row['title'],
                'description' => $row['description']
            );
        }

        return $projects;
    }

    function getAllTasksByProject($request) {
        if (!isset($request['id'])) {
            return null;
        }

        $pid = $request['id'];
        $db = new SQLite3("melondb.db3");
        $query = "SELECT * FROM tasks
            WHERE project_id = $pid
            ORDER BY enddate DESC";
        $result = $db -> query($query);

        $tasks = array();
        while ($row = $result -> fetchArray()) {
            $tasks[] = array(
                'id' => $row['id'],
                'assignee' => $row['user_id'],
                'project' => $row['project_id'],
                'status' => $row['status'],
                'title' => $row['title'],
                'description' => $row['description'],
                'startDate' => $row['startdate'],
                'endDate' => $row['enddate']
            );
        }

        return $tasks;
    }

    function getAllTasksByUser($request) {
        $uid = isset(
            $request['id']) ?
            $request['id'] :
            $_SESSION['userid'];

        $db = new SQLite3("melondb.db3");
        $query = "SELECT * FROM tasks
            WHERE user_id = $uid
            ORDER BY enddate DESC";
        $result = $db -> query($query);

        $tasks = array();
        while ($row = $result -> fetchArray()) {
            $tasks[] = array(
                'id' => $row['id'],
                'assignee' => $row['user_id'],
                'project' => $row['project_id'],
                'status' => $row['status'],
                'title' => $row['title'],
                'description' => $row['description'],
                'startDate' => $row['startdate'],
                'endDate' => $row['enddate']
            );
        }

        return $tasks;
    }

    function getAllUsers($request) {
        $avatarSize = isset(
            $request['avatarSize']) ? 
            $request['avatarSize'] :
            96;

        $db = new SQLite3("melondb.db3");
        $query = "SELECT * FROM users";
        $result = $db -> query($query);

        $users = array();
        while ($row = $result->fetchArray()) {
            $users[] = array(
                'id' => $row['id'],
                'name' => $row['name'],
                'email' => $row['email'],
                'avatar' => get_gravatar($row['email'], $avatarSize),
                'description' => $row['description']
            );
        }

        return $users;
    }

    function getAllProjects($request) {
        $db = new SQLite3("melondb.db3");
        $query = "SELECT * FROM projects";
        $result = $db -> query($query);

        $projects = array();
        while ($row = $result -> fetchArray()) {
            $projects[] = array(
                'id' => $row['id'],
                'owner' => $row['owner_id'],
                'title' => $row['title'],
                'description' => $row['description']
            );
        }

        return $projects;
    }
?>