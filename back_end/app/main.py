from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.database import Base, engine
from app.routes import article, user, roles, denuncias  # Importe todos os routers aqui
import os

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Gerenciador de ciclo de vida da aplicação"""
    # Cria as tabelas no banco de dados (em produção, use migrações)
    if os.getenv("ENV") != "TEST":
        Base.metadata.create_all(bind=engine)
    yield
    # Código de limpeza pós-shutdown pode vir aqui

app = FastAPI(
    title="Ambiciente API",
    description="API para o projeto Ambiciente",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/api/docs",  # Customiza a URL da documentação
    redoc_url=None,  # Desabilita Redoc se não for usar
)

# Configuração CORS mais segura para produção
origins = [
    "https://ambiciente.vercel.app",
    "http://localhost:3000",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],  # Útil para downloads
)

# Rotas de API
app.include_router(
    article.router,
    prefix="/api/artigos",
    tags=["Artigos"],
)

app.include_router(
    user.router,
    prefix="/api/users",
    tags=["Usuários"],
)

app.include_router(
    roles.router,
    prefix="/api/roles",
    tags=["Roles"],
)

app.include_router(
    denuncias.router,
    prefix="/api/denuncias",
    tags=["Denúncias"],
)

# Health Check (opcional mas recomendado)
@app.get("/api/health", tags=["Monitoramento"])
async def health_check():
    return {"status": "healthy", "version": app.version}