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
        bucket                      = "orida-staging"
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
    project_id = "240c159d-951c-48db-b8d1-1471d755e33a"
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
    basic_auth  = false

    rdb_name = "staging"
    registry = "rg.fr-par.scw.cloud/thetribe-staging"

    backend_sentry_dsn = "https://3ac8857ec75d442f8708dffa80f5f875@o132732.ingest.sentry.io/6308941"
    backend_image_tag = "develop"
    backend_typeform_token = var.typeform_token
    backend_google_maps_key = var.google_maps_key

    frontend_sentry_dsn = "https://20453e06f46c4c14bfdc09ca863ca183@o132732.ingest.sentry.io/6308943"
    frontend_image_tag = "develop"

    admin_sentry_dsn = "https://587442fa645846698f3d9a92fffa60ee@o132732.ingest.sentry.io/6308946"
    admin_image_tag = "develop"
}
