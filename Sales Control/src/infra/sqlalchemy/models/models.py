from sqlalchemy import Column, String, Integer, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from src.infra.sqlalchemy.config.database import Base

class Vendas(Base):
    
    __tablename__="vendas"

    id= Column(Integer, primary_key=True, index=True)
    codigo = Column(Integer)
    nome = Column(String)
    preco = Column(Float)
    quantidade = Column(Integer)
    tipo_de_pagamento = Column(String) 
    nome_cliente = Column(String)

    produtos = relationship('Produtos', back_populates='vendas')

class Produtos(Base):
    
    __tablename__="produtos"

    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(Integer)
    nome = Column(String)
    preco = Column(Float)
    qtd_produtos = Column(Integer)
    detalhes = Column(String)
    disponivel = Column(Boolean)
    vendas_id = Column(Integer, ForeignKey('vendas.id', name='fk_vendas'))

    
    vendas = relationship('Vendas', back_populates='produtos')