variable "scw_access_key" {
    type     = string
    nullable = false
}

variable "scw_secret_key" {
    type      = string
    nullable  = false
    sensitive = true
}

variable "typeform_token" {
    type      = string
    nullable  = false
    sensitive = true
}
