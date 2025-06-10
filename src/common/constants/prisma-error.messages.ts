export const PRISMA_ERROR_MESSAGES = {
  UNIQUE_CONSTRAINT_VIOLATION: (targetFields: string) =>
    `Já existe um registro com o(s) campo(s) ${targetFields || 'informado(s)'}`,
  FOREIGN_KEY_VIOLATION_DELETE:
    'Este registro não pode ser excluído porque existem outros registros vinculados a ele',
  FOREIGN_KEY_VIOLATION_CREATE_OR_UPDATE:
    'Um dos registros referenciados não foi encontrado',
  RECORD_NOT_FOUND: 'Registro não encontrado ou já foi removido.',
};
