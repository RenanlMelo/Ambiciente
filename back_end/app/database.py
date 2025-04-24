from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from contextlib import contextmanager
from typing import Generator
import os
import logging

# Configure logging
logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.WARNING)

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./sql_app.db")

# SQLite-specific configuration
connect_args = {}
if DATABASE_URL and "sqlite" in DATABASE_URL:
    connect_args = {"check_same_thread": False}

# Create database engine with enhanced configuration
engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True,  # Check connections before use
    pool_size=10,        # Number of connections to keep open
    max_overflow=20,     # Number of connections beyond pool_size
    pool_timeout=30,     # Seconds to wait before giving up on getting a connection
    pool_recycle=3600,   # Recycle connections after 1 hour
    echo=os.getenv("SQL_ECHO", "false").lower() == "true"  # Log SQL queries
)

# Session factory with enhanced configuration
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    expire_on_commit=False  # Recommended for FastAPI
)

# Base class for models
Base = declarative_base()

def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db() -> None:
    """
    Initialize the database by creating all tables.
    Call this during application startup.
    """
    Base.metadata.create_all(bind=engine)
    logging.info("Database tables initialized")

def drop_db() -> None:
    """
    Drop all database tables (for testing/development).
    Use with caution in production!
    """
    Base.metadata.drop_all(bind=engine)
    logging.warning("Database tables dropped")