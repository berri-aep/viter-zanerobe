<?php
class Adv
{
    public $adv_aid;
    public $adv_is_active;
    public $adv_title;
    public $adv_image;
    public $adv_datetime;
    public $adv_created;

    public $connection;
    public $lastInsertedId;

    public $tbladv;

    public $adv_start;
    public $adv_total;
    public $adv_search;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tbladv = "adv";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tbladv} ";
            $sql .= "( adv_title, ";
            $sql .= "adv_is_active, ";
            $sql .= "adv_image, ";
            $sql .= "adv_datetime, ";
            $sql .= "adv_created ) values ( ";
            $sql .= ":adv_title, ";
            $sql .= ":adv_is_active, ";
            $sql .= ":adv_image, ";
            $sql .= ":adv_datetime, ";
            $sql .= ":adv_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "adv_title" => $this->adv_title,
                "adv_is_active" => $this->adv_is_active,
                "adv_image" => $this->adv_image,
                "adv_datetime" => $this->adv_datetime,
                "adv_created" => $this->adv_created,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read all
    public function readAll()
    {
        try {
            $sql = "select * from {$this->tbladv} ";
            $sql .= "order by adv_is_active desc, ";
            $sql .= "adv_title asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // read limit
    public function readLimit()
    {
        try {
            $sql = "select * from {$this->tbladv} ";
            $sql .= "order by adv_is_active desc, ";
            $sql .= "adv_title asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->adv_start - 1,
                "total" => $this->adv_total,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    // read by id
    public function readById()
    {
        try {
            $sql = "select * from {$this->tbladv} ";
            $sql .= "where adv_aid  = :adv_aid ";
            $sql .= "order by adv_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "adv_aid" => $this->adv_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

   // update
    public function update()
    {
        try {
            $sql = "update {$this->tbladv} set ";
            $sql .= "adv_title = :adv_title, ";
            $sql .= "adv_image = :adv_image, ";
            $sql .= "adv_datetime = :adv_datetime ";
            $sql .= "where adv_aid = :adv_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "adv_title" => $this->adv_title,
                "adv_datetime" => $this->adv_datetime,
                "adv_aid" => $this->adv_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // active
    public function active()
    {
        try {
            $sql = "update {$this->tbladv} set ";
            $sql .= "adv_is_active = :adv_is_active, ";
            $sql .= "adv_datetime = :adv_datetime ";
            $sql .= "where adv_aid = :adv_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "adv_is_active" => $this->adv_is_active,
                "adv_datetime" => $this->adv_datetime,
                "adv_aid" => $this->adv_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // delete
    public function delete()
    {
        try {
            $sql = "delete from {$this->tbladv} ";
            $sql .= "where adv_aid = :adv_aid  ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "adv_aid" => $this->adv_aid,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // name
    public function checkName()
    {
        try {
            $sql = "select adv_title from {$this->tbladv} ";
            $sql .= "where adv_title = :adv_title ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "adv_title" => "{$this->adv_title}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    // // name
    // public function checkAssociation()
    // {
    //     try {
    //         $sql = "select product_recipe_id from {$this->tblrecipe} ";
    //         $sql .= "where product_recipe_id = :product_recipe_id ";
    //         $query = $this->connection->prepare($sql);
    //         $query->execute([
    //             "product_recipe_id" => $this->recipe_aid,
    //         ]);
    //     } catch (PDOException $ex) {
    //         $query = false;
    //     }
    //     return $query;
    // }

    public function search()
    {
        try {

            $sql = "select * from {$this->tbladv} ";
            $sql .= "where adv_title like :adv_title ";
            $sql .= "order by adv_is_active desc, ";
            $sql .= "adv_title ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "adv_title" => "%{$this->adv_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterActive()
    {
        try {

            $sql = "select * from {$this->tbladv} ";
            $sql .= "where adv_is_active = :adv_is_active ";
            $sql .= "order by adv_is_active desc, ";
            $sql .= "adv_title ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "adv_is_active" => $this->adv_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterActiveSearch()
    {
        try {

            $sql = "select * from {$this->tbladv} ";
            $sql .= "where adv_is_active = :adv_is_active ";
            $sql .= "order by adv_is_active desc, ";
            $sql .= "adv_title ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "adv_is_active" => $this->adv_is_active,
                "adv_title" => "%{$this->adv_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


}