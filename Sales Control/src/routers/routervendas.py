from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from src.schemas.schemas import Vendas
from src.infra.sqlalchemy.config.database import get_bd
from src.infra.sqlalchemy.repositorio.repositoriovendas import RepositorioVendas


router = APIRouter()


#Vender PRODUTO.
@router.post('/vendas')
def vendas_produtos(vendas: Vendas, db: Session = Depends(get_bd)):
    vender_produto = RepositorioVendas(db).vender_produtos(vendas)
    return vender_produto



#Listar todos os PRODUTOS vendidos pelo CODIGO
@router.get('/vendas')
def listar_prod_vendidos(db: Session = Depends(get_bd)):
    listar_prod_vendidos = RepositorioVendas(db).listar_vendas_por_produto()
    return listar_prod_vendidos