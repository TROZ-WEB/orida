terraform {
    required_providers {
        docker = {
            source = "kreuzwerker/docker"
        }
        helm = {
            source = "hashicorp/helm"
        }
        random = {
            source = "hashicorp/random"
        }
        scaleway = {
            source = "scaleway/scaleway"
        }
    }

    backend "s3" {
        bucket                      = "" # TODO: add bucket
        key                         = "orida-staging.tfstate"
        region                      = "fr-par"
        endpoint                    = "https://s3.fr-par.scw.cloud"
        skip_credentials_validation = true
        skip_region_validation      = true
    }
}

provider "scaleway" {
    zone       = "fr-par-1"
    region     = "fr-par"
    access_key = var.scw_access_key
    secret_key = var.scw_secret_key
    project_id = "00000000-0000-0000-0000-000000000000" # TODO add project id
}

data "scaleway_k8s_cluster" "staging" {
    name = "staging"
}

provider "kubernetes" {
    host                   = data.scaleway_k8s_cluster.staging.kubeconfig[0].host
    token                  = data.scaleway_k8s_cluster.staging.kubeconfig[0].token
    cluster_ca_certificate = base64decode(data.scaleway_k8s_cluster.staging.kubeconfig[0].cluster_ca_certificate)
}

provider "helm" {
    kubernetes {
        host                   = data.scaleway_k8s_cluster.staging.kubeconfig[0].host
        token                  = data.scaleway_k8s_cluster.staging.kubeconfig[0].token
        cluster_ca_certificate = base64decode(data.scaleway_k8s_cluster.staging.kubeconfig[0].cluster_ca_certificate)
    }
}

data "kubernetes_secret" "registry" {
    metadata {
        name = "registry-secret"
    }
}

provider "docker" {
    registry_auth {
        address             = "rg.fr-par.scw.cloud"
        config_file_content = data.kubernetes_secret.registry.data[".dockerconfigjson"]
    }
}

module "deployment" {
    source = "../../modules/deployment"

    environment_name = "staging"

    host        = "orida.thestaging.io"
    certificate = "wildcard-cert"
    basic_auth  = true

    rdb_name = "staging"
    registry = "rg.fr-par.scw.cloud/thetribe-staging"
    backend_sentry_dsn = " https://31f30852172f467191c0a45651199f19@sentry.thetribe.io/126"
    backend_image_tag = "develop"
    frontend_sentry_dsn = "https://b848433d1a7342dbb9713b906783c8a1@sentry.thetribe.io/125"
    frontend_image_tag = "develop"
    admin_sentry_dsn = "https://33bc2a9272ba494d841b6297cba1b51e@sentry.thetribe.io/127"
    admin_image_tag = "develop"
}
