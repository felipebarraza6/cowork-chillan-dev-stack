# REST Framework
from rest_framework.viewsets import ReadOnlyModelViewSet

# DRF Renderer Xlsx
from drf_renderer_xlsx.mixins import XLSXFileMixin
from drf_renderer_xlsx.renderers import XLSXRenderer

# Models
from crm.clients.models import Client, Business

# Serializers
from crm.clients.serializers import BusinessModelSerializer

# Serializers Reports
from crm.clients.serializers import ReportNaturalPersonSerializer, ReportLegalRepresentSrializer, ReportBusinessSerializer

# Filters
from django_filters import rest_framework as filters

# Timezone
from django.utils import timezone, dateformat


class ReportBusiness(XLSXFileMixin, ReadOnlyModelViewSet):

    queryset = Business.objects.all()
    serializer_class = ReportBusinessSerializer
    renderer_classes = (XLSXRenderer,)
    filter_backends = (filters.DjangoFilterBackend,)
    filename = 'listado_empresas.xlsx'

    column_header = {
            'titles': [
                'Nombre Empresa',
                'RUT',
                'Rubro Comercial',
                'Giros',
                'Región',
                'Comuna',
                'Provincia',
                'Dirección',
                'Sitio Web',
                'Email',
                'Telefono',
                'Activo',
                'Recibe Mentorias',
                'Area',
                'Nombre(R.L)',
                'RUT(R.L)',
                'Genero(R.L)',
                'Region(R.L)',
                'Provincia(R.L)',
                'Email(R.L)',
                'Telefono(R.L)'
            ],
            'style': {
                'fill': {
                    'fill_type': 'solid',
                    'start_color': '000000',
                },
                'alignment': {
                    'horizontal': 'center',
                    'vertical': 'center',
                },
                'font': {
                    'name': 'Arial',
                    'size': 9,
                    'color': 'FFFFFF',
                }
            }
        }
        

    def get_header(self):
        date_now = dateformat.format(timezone.now(), 'Y-m-d')
        
        return {
            'tab_title': 'REPORTE',
            'img': 'cowork_api/media/logo.png',
            'header_title': 'Fecha de descarga: {}'.format(
                date_now
            ),
            'height': 45,
            'style': {
                'fill': {
                    'fill_type': 'solid',
                    'start_color': 'FFFFFFFF',
                },
                'alignment': {
                    'horizontal': 'left',                    
                    'wrapText': True,
                    'shrink_to_fit': True,
                },
                'border_side': {
                    'border_style': 'thin',
                    'color': 'FF000000',
                },
                'font': {
                    'name': 'Arial',
                    'size': 12,
                    'bold': True,
                    'color': 'FF000000',
                }
            }
        }

        

class ReportLegalRepresent(XLSXFileMixin, ReadOnlyModelViewSet):
    
    queryset = Client.objects.filter(is_legal_represent=True)
    serializer_class = ReportLegalRepresentSrializer
    renderer_classes = (XLSXRenderer,)
    filter_backends = (filters.DjangoFilterBackend,)
    filename = 'listdo_representantes_legales.xlsx'

    column_header = {
        'titles': [
            'Nombre',
            'Primer Apellido',
            'Segundo Apellido',
            'RUT',
            'Telefono',
            'Email',
            'Region',
            'Provincia',
            'Comuna',
            'Dirección',
            'Genero',
            'Empresa'
        ],
        'style': {
            'fill': {
                'fill_type': 'solid',
                'start_color': '000000',
            },
            'alignment': {
                'horizontal': 'center',
                'vertical': 'center',
            },
            'font': {
                'name': 'Arial',
                'size': 9,
                'color': 'FFFFFF',
            },
        },
    }

    def get_header(self):
        date_now = dateformat.format(timezone.now(), 'Y-m-d')
        
        return {
            'tab_title': 'REPORTE',
            'img': 'cowork_api/media/logo.png',
            'header_title': 'Fecha de descarga: {}'.format(
                date_now
            ),
            'height': 45,
            'style': {
                'fill': {
                    'fill_type': 'solid',
                    'start_color': 'FFFFFFFF',
                },
                'alignment': {
                    'horizontal': 'left',                    
                    'wrapText': True,
                    'shrink_to_fit': True,
                },
                'border_side': {
                    'border_style': 'thin',
                    'color': 'FF000000',
                },
                'font': {
                    'name': 'Arial',
                    'size': 12,
                    'bold': True,
                    'color': 'FF000000',
                }
            }
        }

class ReportNaturalPerson(XLSXFileMixin, ReadOnlyModelViewSet):

    queryset = Client.objects.filter(is_natural_person=True)
    serializer_class = ReportNaturalPersonSerializer
    renderer_classes = (XLSXRenderer,)
    filter_backends = (filters.DjangoFilterBackend,)
    filename = 'listado_personas_naturales.xlsx'

    column_header = {
        'titles': [
            "Nombre Negocio",
            "Giros",
            "RUT",
            "Región",
            "Comuna",
            "Provincia",
            "Dirección",
            "Web",
            "Email",
            "Teléfono",
            "Cliente",
            "Nombre",
            "Primer Apellido",
            "Segundo Apellido",
            "Genero",
            "Recibe Mentorías",
            "Area de Trabajo"
        ],
        'style': {
            'fill': {
                'fill_type': 'solid',
                'start_color': '000000',
            },
            'alignment': {
                'horizontal': 'center',
                'vertical': 'center',
            },
            'font': {
                'name': 'Arial',
                'size': 9,
                'color': 'FFFFFF',
            },
        },
    }

    def get_header(self):
        date_now = dateformat.format(timezone.now(), 'Y-m-d')
        
        return {
            'tab_title': 'REPORTE',
            'img': 'cowork_api/media/logo.png',
            'header_title': 'Fecha de descarga: {}'.format(
                date_now
            ),
            'height': 45,
            'style': {
                'fill': {
                    'fill_type': 'solid',
                    'start_color': 'FFFFFFFF',
                },
                'alignment': {
                    'horizontal': 'left',                    
                    'wrapText': True,
                    'shrink_to_fit': True,
                },
                'border_side': {
                    'border_style': 'thin',
                    'color': 'FF000000',
                },
                'font': {
                    'name': 'Arial',
                    'size': 12,
                    'bold': True,
                    'color': 'FF000000',
                }
            }
        }
