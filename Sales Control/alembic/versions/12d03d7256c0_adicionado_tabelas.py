"""Adicionado Tabelas

Revision ID: 12d03d7256c0
Revises: 
Create Date: 2021-05-20 14:56:16.803025

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '12d03d7256c0'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cliente',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nome', sa.String(), nullable=True),
    sa.Column('telefone', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('cliente', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_cliente_id'), ['id'], unique=False)

    op.create_table('produtos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('codigo', sa.Integer(), nullable=True),
    sa.Column('nome', sa.String(), nullable=True),
    sa.Column('preco', sa.Float(), nullable=True),
    sa.Column('qtd_produtos', sa.Integer(), nullable=True),
    sa.Column('detalhes', sa.String(), nullable=True),
    sa.Column('disponivel', sa.Boolean(), nullable=True),
    sa.Column('cliente_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['cliente_id'], ['cliente.id'], name='fk_cliente'),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('produtos', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_produtos_id'), ['id'], unique=False)

    op.create_table('vendas',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('codigo', sa.Integer(), nullable=True),
    sa.Column('nome', sa.String(), nullable=True),
    sa.Column('preco', sa.Float(), nullable=True),
    sa.Column('quantidade', sa.Integer(), nullable=True),
    sa.Column('tipo_de_pagamento', sa.String(), nullable=True),
    sa.Column('cliente_id', sa.Integer(), nullable=True),
    sa.Column('produto_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['cliente_id'], ['cliente.id'], name='fk_vendas_usuario'),
    sa.ForeignKeyConstraint(['produto_id'], ['produtos.id'], name='fk_vendas_produtos'),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('vendas', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_vendas_id'), ['id'], unique=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('vendas', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_vendas_id'))

    op.drop_table('vendas')
    with op.batch_alter_table('produtos', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_produtos_id'))

    op.drop_table('produtos')
    with op.batch_alter_table('cliente', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_cliente_id'))

    op.drop_table('cliente')
    # ### end Alembic commands ###
