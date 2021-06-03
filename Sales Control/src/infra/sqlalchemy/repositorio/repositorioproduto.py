from sqlalchemy.orm import Session
from sqlalchemy import delete, update, select
from src.schemas import schemas
from src.infra.sqlalchemy.models import models



class RepositorioProduto():

    def __init__(self, db: Session):
        self.db = db


    def criar_produtos(self, produtos: schemas.Produtos):
        db_produtos = models.Produtos(codigo=produtos.codigo, nome=produtos.nome, preco=produtos.preco, 
                                      qtd_produtos=produtos.qtd_produtos, detalhes=produtos.detalhes,
                                      disponivel=produtos.disponivel)

        self.db.add(db_produtos)
        self.db.commit()
        self.db.refresh(db_produtos)
        return db_produtos
    

    def listar_produtos(self):
        stmt = select(models.Produtos)
        lista_de_produtos = self.db.execute(stmt).scalars().all()
        return lista_de_produtos


    def editar_produto(self, id: int, produtos: schemas.Produtos):
        update_produto = update(models.Produtos).where(models.Produtos.id == id).values(codigo=produtos.codigo, nome=produtos.nome, preco=produtos.preco, 
                                      qtd_produtos=produtos.qtd_produtos, detalhes=produtos.detalhes,
                                      disponivel=produtos.disponivel)
        self.db.execute(update_produto)
        self.db.commit()
        
    
    def remover_produto(self, produto_codigo):
        exibir = self.db.query(models.Produtos)
        if exibir := exibir.filter(
            models.Produtos.codigo == produto_codigo
            ).first():
            self.db.delete(exibir)
            self.db.commit()
            return {'Mensagem': f'Produto {exibir.nome} removido com sucesso!.'}
        return {'Mensagem': f'Código {produto_codigo} não encontrado!.'}