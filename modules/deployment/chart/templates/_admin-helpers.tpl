{{- define "orida.admin.image" }}
{{- .Values.registry }}/orida-admin
{{- if .Values.admin.image.digest -}}
@{{ .Values.admin.image.digest }}
{{- else -}}
:{{ .Values.admin.image.tag }}
{{- end -}}
{{- end }}
