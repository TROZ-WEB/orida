{{- define "orida.frontend.image" }}
{{- .Values.registry }}/orida-frontend
{{- if .Values.frontend.image.digest -}}
@{{ .Values.frontend.image.digest }}
{{- else -}}
:{{ .Values.frontend.image.tag }}
{{- end -}}
{{- end }}
