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

variable "typeform_workspace" {
    type      = string
    nullable  = false
    sensitive = true
}

variable "google_maps_key" {
    type      = string
    nullable  = false
    sensitive = true
}

variable "uploadcare_public_key" {
    type      = string
    nullable  = false
    sensitive = true
}
