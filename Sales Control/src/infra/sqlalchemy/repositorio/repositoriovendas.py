from sqlalchemy.orm import Session
from src.schemas import schemas
from src.infra.sqlalchemy.models import models
from sqlalchemy import select


class RepositorioVendas:

    def __init__(self, db: Session):
        self.db = db

    
    def vender_produtos(self, vendas: schemas.Vendas):
        db_vendas = models.Vendas(preco=vendas.preco, 
                                  quantidade=vendas.quantidade, 
                                  tipo_de_pagamento=vendas.tipo_de_pagamento,
                                  codigo=vendas.codigo,
                                  nome=vendas.nome,
                                  nome_cliente=vendas.nome_cliente
                                  )

        self.db.add(db_vendas)
        self.db.commit()
        self.db.refresh(db_vendas)
        return db_vendas


    def listar_vendas_por_produto(self):
        consultar_vendas = select(models.Vendas)
        result = self.db.execute(consultar_vendas).scalars().all()
        return result
    