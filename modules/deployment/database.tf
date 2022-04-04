data "scaleway_rdb_instance" "main" {
    name = var.rdb_name
}

resource "random_password" "backend" {
    length = 32
}

resource "scaleway_rdb_user" "backend" {
    instance_id = data.scaleway_rdb_instance.main.id
    name        = "orida_backend"
    password    = random_password.backend.result
}

resource "scaleway_rdb_database" "backend" {
    instance_id = data.scaleway_rdb_instance.main.id
    name        = "orida_backend"
}

resource "scaleway_rdb_privilege" "backend" {
    instance_id   = data.scaleway_rdb_instance.main.id
    user_name     = scaleway_rdb_user.backend.name
    database_name = scaleway_rdb_database.backend.name
    permission    = "all"
}
