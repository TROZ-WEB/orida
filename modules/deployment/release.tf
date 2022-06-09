resource "helm_release" "main" {
    name      = var.release_name
    namespace = var.release_namespace

    chart = "${path.module}/chart/"

    set {
        name  = "environment_name"
        value = var.environment_name
    }

    set {
        name  = "host"
        value = var.host
    }

    set {
        name  = "certificate"
        value = var.certificate
    }

    set {
        name  = "registry"
        value = var.registry
    }

    set {
        name  = "basic_auth_password"
        value = var.basic_auth ? random_password.basic_auth.result : "null"
    }

    set {
        name  = "backend.image.digest"
        value = data.docker_registry_image.backend.sha256_digest
    }

    set {
        name  = "backend.sentry.dsn"
        value = var.backend_sentry_dsn
    }

    set {
        name  = "backend.cookie.secret"
        value = random_password.backend_cookie_secret.result
    }

    set {
        name  = "frontend.image.digest"
        value = data.docker_registry_image.frontend.sha256_digest
    }

    set {
        name  = "frontend.sentry.dsn"
        value = var.frontend_sentry_dsn
    }

    set {
        name  = "backend.google_maps_key"
        value = var.backend_google_maps_key
    }
    
    set {
        name  = "backend.tiny_mce_key"
        value = var.backend_tiny_mce_key
    }
    
    set {
        name  = "backend.uploadcare_public_key"
        value = var.backend_uploadcare_public_key
    }

    set {
        name  = "backend.database.host"
        value = data.scaleway_rdb_instance.main.endpoint_ip
    }

    set {
        name  = "backend.database.port"
        value = data.scaleway_rdb_instance.main.endpoint_port
    }

    set {
        name  = "backend.database.user"
        value = scaleway_rdb_user.backend.name
    }

    set {
        name  = "backend.database.password"
        value = random_password.backend.result
    }

    set {
        name  = "backend.database.name"
        value = scaleway_rdb_database.backend.name
    }

    set {
        name  = "backend.typeform_token"
        value = var.backend_typeform_token
    }

    set {
        name  = "backend.typeform_webhook_url"
        value = var.backend_typeform_webhook_url
    }

    set {
        name  = "backend.typeform_workspace"
        value = var.backend_typeform_workspace
    }

    set {
        name  = "admin.image.digest"
        value = data.docker_registry_image.admin.sha256_digest
    }

    set {
        name  = "admin.sentry.dsn"
        value = var.admin_sentry_dsn
    }
}

resource "random_password" "basic_auth" {
    length = 16
}

data "docker_registry_image" "backend" {
    name = "${var.registry}/orida-backend:${var.backend_image_tag}"
}

resource "random_password" "backend_cookie_secret" {
    length = 32
}

data "docker_registry_image" "frontend" {
    name = "${var.registry}/orida-frontend:${var.frontend_image_tag}"
}

data "docker_registry_image" "admin" {
    name = "${var.registry}/orida-admin:${var.admin_image_tag}"
}
