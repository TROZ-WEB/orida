variable "environment_name" {
    type     = string
    nullable = false
}

variable "host" {
    type     = string
    nullable = false
}

variable "certificate" {
    type        = string
    nullable    = true
    default     = null
    description = "Allow to pass a specific certificate instead of requesting one to cert-manager"
}

variable "rdb_name" {
    type     = string
    nullable = false
}

variable "release_name" {
    type     = string
    nullable = false
    default  = "orida"
}

variable "release_namespace" {
    type     = string
    nullable = false
    default  = "default"
}

variable "registry" {
    type     = string
    nullable = false
}

variable "basic_auth" {
    type     = bool
    nullable = false
    default  = false
}

variable "backend_sentry_dsn" {
    type = string
}

variable "backend_image_tag" {
    type = string
}

variable "frontend_sentry_dsn" {
    type = string
}

variable "frontend_image_tag" {
    type = string
}

variable "admin_sentry_dsn" {
    type = string
}

variable "admin_image_tag" {
    type = string
}
