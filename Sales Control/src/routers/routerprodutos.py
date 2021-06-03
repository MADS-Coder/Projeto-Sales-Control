from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session
from src.schemas.schemas import Produtos, ProdutoSimples
from src.infra.sqlalchemy.config.database import get_bd
from src.infra.sqlalchemy.repositorio.repositorioproduto import RepositorioProduto


router = APIRouter()


#Cadastra os produtos
@router.post('/produtos', response_model=ProdutoSimples)
def cadastrar_produtos(produto: Produtos, db: Session = Depends(get_bd)):
    produtos_cadastrados = RepositorioProduto(db).criar_produtos(produto)
    return produtos_cadastrados


#Lista todos os produtos cadastrados
@router.get('/produtos', response_model=List[ProdutoSimples])
def listar_produtos(db: Session = Depends(get_bd)):
    produtos = RepositorioProduto(db).listar_produtos()
    return produtos


#Edita o produto selecionado pelo código
@router.put('/produtos/{id}', response_model=Produtos)
def atualizar_produto(id: int, produto: Produtos, db: Session = Depends(get_bd)):
    RepositorioProduto(db).editar_produto(id, produto)
    produto.id = id
    return produto


#Remove o produto pelo id.
@router.delete('/produtos/{produto_codigo}')
def remover_produto(produto_codigo: str, db: Session=Depends(get_bd)):
    remover = RepositorioProduto(db).remover_produto(produto_codigo)
    if not remover:
        raise HTTPException(status_code=404, detail=f"Codigo {produto_codigo} do produto não localizado!")
    return remover