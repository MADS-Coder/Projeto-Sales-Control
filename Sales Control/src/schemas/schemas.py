from pydantic import BaseModel
from typing import Optional

class ProdutoSimples(BaseModel):
    id: Optional[int]
    codigo: int
    nome: str
    preco: float
    qtd_produtos: str
    detalhes: str

    class Config: 
        orm_mode = True


class Produtos(BaseModel):
    id: Optional[int] = None
    codigo: int
    nome: str
    preco: float
    qtd_produtos: int
    detalhes: str
    disponivel: bool = False

    class Config:
        orm_mode = True

    
class Vendas(BaseModel):
    id: Optional[int]
    codigo: int
    nome: str
    preco: float
    quantidade: int
    tipo_de_pagamento: str
    nome_cliente: str


    class Config:
        orm_mode=True


class VendaSimples(BaseModel):
    id: Optional[int]
    nome: str
    preco: float
    quantidade: int
    nome_cliente: str


    class Config:
        orm_mode=True