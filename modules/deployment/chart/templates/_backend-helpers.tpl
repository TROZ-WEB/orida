{{- define "orida.backend.image" }}
{{- .Values.registry }}/orida-backend
{{- if .Values.backend.image.digest -}}
@{{ .Values.backend.image.digest }}
{{- else -}}
:{{ .Values.backend.image.tag }}
{{- end -}}
{{- end }}
