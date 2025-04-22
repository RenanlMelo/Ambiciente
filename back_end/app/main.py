from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import article  # Importando o roteador corretamente
from app.database import Base, engine
from app.routes import user

app = FastAPI()

# Configuração do CORS
origins = [
    "https://ambiciente.vercel.app",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

# Incluindo os endpoints do artigo com um prefixo
app.include_router(article.router, prefix="/artigos", tags=["Articles"])
# app.include_router(report.router, prefix="/reports", tags=["Reports"])
app.include_router(user.router, prefix="/user", tags=["Users"])