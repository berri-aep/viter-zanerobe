<?php
class Clothes
{
    public $clothes_aid;
    public $clothes_is_active;
    public $clothes_title;
    public $clothes_category_id;
    public $clothes_price;
    public $clothes_size;
    public $clothes_slug;
    public $clothes_image1;
    public $clothes_image2;
    public $clothes_datetime;
    public $clothes_created;

    public $category_aid;
    public $category_is_active;
    public $category_title;
    public $category_datetime;
    public $category_created;

    public $connection;
    public $lastInsertedId;

    public $tblcategory;
    public $tblclothes;

    public $clothes_start;
    public $clothes_total;
    public $clothes_search;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblclothes = "clothes";
        $this->tblcategory = "category";
    }

    // create
    public function create()
    {
        try {
            $sql = "insert into {$this->tblclothes} ";
            $sql .= "( clothes_title, ";
            $sql .= "clothes_is_active, ";
            $sql .= "clothes_category_id, ";
            $sql .= "clothes_slug, ";
            $sql .= "clothes_price, ";
            $sql .= "clothes_size, ";
            $sql .= "clothes_image1, ";
            $sql .= "clothes_image2, ";
            $sql .= "clothes_datetime, ";
            $sql .= "clothes_created ) values ( ";
            $sql .= ":clothes_title, ";
            $sql .= ":clothes_is_active, ";
            $sql .= ":clothes_category_id, ";
            $sql .= ":clothes_slug, ";
            $sql .= ":clothes_price, ";
            $sql .= ":clothes_size, ";
            $sql .= ":clothes_image1, ";
            $sql .= ":clothes_image2, ";
            $sql .= ":clothes_datetime, ";
            $sql .= ":clothes_created ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "clothes_title" => $this->clothes_title,
                "clothes_is_active" => $this->clothes_is_active,
                "clothes_category_id" => $this->clothes_category_id,
                "clothes_slug" => $this->clothes_slug,
                "clothes_price" => $this->clothes_price,
                "clothes_size" => $this->clothes_size,
                "clothes_image1" => $this->clothes_image1,
                "clothes_image2" => $this->clothes_image2,
                "clothes_datetime" => $this->clothes_datetime,
                "clothes_created" => $this->clothes_created,
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
            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblcategory} as category, ";
            $sql .= "{$this->tblclothes} as clothes ";
            $sql .= "where category.category_aid = clothes.clothes_category_id ";
            $sql .= "order by clothes.clothes_is_active desc, ";
            $sql .= "clothes.clothes_title asc ";
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
              $sql = "select * ";
          $sql .= "from ";
          $sql .= "{$this->tblcategory} as category, ";
          $sql .= "{$this->tblclothes} as clothes ";
           $sql .= "where category.category_aid = clothes.clothes_category_id ";
            $sql .= "order by clothes.clothes_is_active desc, ";
            $sql .= "clothes.clothes_title asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "start" => $this->clothes_start - 1,
                "total" => $this->clothes_total,
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
            $sql = "select * from {$this->tblclothes} ";
            $sql .= "where clothes_aid  = :clothes_aid ";
            $sql .= "order by clothes_is_active desc ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "clothes_aid" => $this->clothes_aid,
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
            $sql = "update {$this->tblclothes} set ";
            $sql .= "clothes_title = :clothes_title, ";
            $sql .= "clothes_category_id = :clothes_category_id, ";
            $sql .= "clothes_slug = :clothes_slug, ";
            $sql .= "clothes_price = :clothes_price, ";
            $sql .= "clothes_size = :clothes_size, ";
            $sql .= "clothes_image1 = :clothes_image1, ";
            $sql .= "clothes_image2 = :clothes_image2, ";
            $sql .= "clothes_datetime = :clothes_datetime ";
            $sql .= "where clothes_aid = :clothes_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "clothes_title" => $this->clothes_title,
                "clothes_category_id" => $this->clothes_category_id,
                "clothes_title" => $this->clothes_title,
                "clothes_price" => $this->clothes_price,
                "clothes_size" => $this->clothes_size,
                "clothes_image1" => $this->clothes_image1,
                "clothes_image2" => $this->clothes_image2,
                "clothes_datetime" => $this->clothes_datetime,
                "clothes_aid" => $this->clothes_aid,
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
            $sql = "update {$this->tblclothes} set ";
            $sql .= "clothes_is_active = :clothes_is_active, ";
            $sql .= "clothes_datetime = :clothes_datetime ";
            $sql .= "where clothes_aid = :clothes_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "clothes_is_active" => $this->clothes_is_active,
                "clothes_datetime" => $this->clothes_datetime,
                "clothes_aid" => $this->clothes_aid,
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
            $sql = "delete from {$this->tblclothes} ";
            $sql .= "where clothes_aid = :clothes_aid  ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "clothes_aid" => $this->clothes_aid,
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
            $sql = "select clothes_title from {$this->tblclothes} ";
            $sql .= "where clothes_title = :clothes_title ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "clothes_title" => "{$this->clothes_title}",
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

            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblcategory} as category, ";
            $sql .= "{$this->tblclothes} as clothes ";
            $sql .= "where clothes.clothes_title like :clothes_title ";
            $sql .= "and category.category_aid = clothes.clothes_category_id ";
            $sql .= "order by clothes_is_active desc, ";
            $sql .= "clothes_title ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "clothes_title" => "%{$this->clothes_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterActive()
    {
        try {

            $sql = "select * ";
            $sql .= "from ";
            $sql .= "{$this->tblcategory} as category, ";
            $sql .= "{$this->tblclothes} as clothes ";
            $sql .= "where clothes.clothes_is_active = :clothes_is_active ";
            $sql .= "and category.category_aid = clothes.clothes_category_id ";
            $sql .= "order by clothes_is_active desc, ";
            $sql .= "clothes_title ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "clothes_is_active" => $this->clothes_is_active,
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function filterActiveSearch()
    {
        try {

            $sql = "select * from {$this->tblclothes} ";
            $sql .= "where clothes_is_active = :clothes_is_active ";
            $sql .= "and clothes_title like :clothes_title ";
            $sql .= "order by clothes_is_active desc, ";
            $sql .= "clothes_title ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "clothes_is_active" => $this->clothes_is_active,
                "clothes_title" => "%{$this->clothes_search}%",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }



}