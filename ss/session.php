<?php
    session_start();

    function setSessionField($name, $data) {
        $_SESSION[$name] = $data;
    }

    function getSessionField($name) {
        if (isset($_SESSION[$name])) {
            return $_SESSION[$name];
        }
        return null;
    }
?>