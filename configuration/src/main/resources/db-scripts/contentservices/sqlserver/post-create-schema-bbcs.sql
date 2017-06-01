create nonclustered index IDX_OPT_IX001 ON OBJECT_DATA (objectId, RD_REPOSITORY_ID)
GO

create nonclustered index IDX_OPT_IX002 ON RELATIONSHIPS (objectId)
GO

create nonclustered index IDX_OPT_IX003 ON RELATIONSHIPS (relationshipType)
GO

create nonclustered index IDX_OPT_IX004 ON RELATIONSHIPS (sourceId)
include (id, objectId, targetRepositoryId, targetObjectId, relationshipType, sourceObjectId)
GO

create nonclustered index IDX_OPT_IX005 ON RELATIONSHIPS (sourceObjectId)
include (id, objectId, sourceId, targetRepositoryId, targetObjectId, relationshipType)
GO