
    create table CONTENT_STREAM (
        id numeric(19,0) identity not null,
        CONTENT image not null,
        primary key (id)
    );

    create table OBJECT_DATA (
        id numeric(19,0) identity not null,
        path nvarchar(765) not null,
        versionLabel nvarchar(255),
        objectTypeId nvarchar(255) not null,
        versionSeriesId nvarchar(255),
        objectId nvarchar(36) not null,
        isLatestVersion nvarchar(255),
        PARENT_ID numeric(19,0),
        CS_ID numeric(19,0),
        RD_REPOSITORY_ID nvarchar(36) not null,
        uniquePathCheck nvarchar(64) not null,
        primary key (id)
    );

    create table PROPERTY_DATA (
        id numeric(19,0) identity not null,
        displayName nvarchar(255),
        localName nvarchar(255),
        OBJECT_DATA_ID numeric(19,0) not null,
        objectId nvarchar(255) not null,
        queryName nvarchar(255),
        value nvarchar(765),
        primary key (id)
    );

    create table RELATIONSHIPS (
        id numeric(19,0) identity not null,
        objectId nvarchar(255) not null,
        sourceId numeric(19,0),
        targetRepositoryId nvarchar(36) not null,
        targetObjectId nvarchar(36) not null,
        sourceObjectId nvarchar(36) not null,
        relationshipType nvarchar(255) not null,
        primary key (id)
    );

    create table RENDITION (
        id numeric(19,0) identity not null,
        filePath nvarchar(765),
        height numeric(19,2),
        kind nvarchar(255),
        length numeric(19,2),
        mimeType nvarchar(255),
        OBJECT_DATA_ID numeric(19,0) not null,
        renditionDocumentId nvarchar(255),
        title nvarchar(255),
        width numeric(19,2),
        objectId nvarchar(255) not null,
        streamId nvarchar(255) not null,
        CS_ID numeric(19,0),
        primary key (id)
    );

    create table REPOSITORY_DEFINITION (
        id numeric(19,0) identity not null,
        REPOSITORY_ID nvarchar(36) not null,
        NAME nvarchar(255) not null,
        DESCRIPTION nvarchar(255),
        VENDOR_NAME nvarchar(255),
        PRODUCT_NAME nvarchar(255),
        PRODUCT_VERSION nvarchar(255) not null,
        primary key (id)
    );

    alter table OBJECT_DATA 
        add constraint UK_6gtsqb7fmaw6p0ikg6xheulrb unique (uniquePathCheck);

    create index ODVL_IDX on OBJECT_DATA (versionLabel);

    create index ODVSID_IDX on OBJECT_DATA (versionSeriesId);

    create index ODILV_IDX on OBJECT_DATA (isLatestVersion);

    create index FK_OD_IDX_CS_ID on OBJECT_DATA (CS_ID);

    create index FK_OD_IDX_OD_RD_REPOID on OBJECT_DATA (RD_REPOSITORY_ID);

    create index FK_OD_IDX_PARENT on OBJECT_DATA (PARENT_ID);

    alter table OBJECT_DATA 
        add constraint FK_mhp750onsg14deqsc5mkp4dx 
        foreign key (PARENT_ID) 
        references OBJECT_DATA;

    alter table OBJECT_DATA 
        add constraint FK_i6hwfpq7ppvktiim2thpqxiac 
        foreign key (CS_ID) 
        references CONTENT_STREAM;

    create index FK_PD_IDX_OBJECT_DATA_ID on PROPERTY_DATA (OBJECT_DATA_ID);

    create index FK_PD_IDX_OBJECTID on PROPERTY_DATA (objectId);

    alter table PROPERTY_DATA 
        add constraint FK_r5pfq0qmo565nb85q01q6r5og 
        foreign key (OBJECT_DATA_ID) 
        references OBJECT_DATA;

    create index REL_TARGET_IDX on RELATIONSHIPS (targetRepositoryId, targetObjectId);

    alter table RELATIONSHIPS 
        add constraint FK_cwor9qcw8nm14qawhqtatfhbc 
        foreign key (sourceId) 
        references OBJECT_DATA;

    create index FK_RND_IDX_OBJECT_DATA_ID on RENDITION (OBJECT_DATA_ID);

    create index FK_RND_IDX_CONTENT_STREAM_ID on RENDITION (CS_ID);

    alter table RENDITION 
        add constraint FK_aw8vtq9lh7ehwfu0oc30q0hqn 
        foreign key (OBJECT_DATA_ID) 
        references OBJECT_DATA;

    alter table RENDITION 
        add constraint FK_l7rl4ulhh823p0t9oswg761c9 
        foreign key (CS_ID) 
        references CONTENT_STREAM;

    alter table REPOSITORY_DEFINITION 
        add constraint UK_xqvd20ipg9a1qh4fb48oekvu unique (REPOSITORY_ID);

    alter table REPOSITORY_DEFINITION 
        add constraint UK_kamy1gwcod11baf33ml8f61jv unique (NAME);
