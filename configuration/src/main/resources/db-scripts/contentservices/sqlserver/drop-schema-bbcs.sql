
    alter table OBJECT_DATA 
        drop constraint FK_mhp750onsg14deqsc5mkp4dx;

    alter table OBJECT_DATA 
        drop constraint FK_i6hwfpq7ppvktiim2thpqxiac;

    alter table PROPERTY_DATA 
        drop constraint FK_r5pfq0qmo565nb85q01q6r5og;

    alter table RELATIONSHIPS 
        drop constraint FK_cwor9qcw8nm14qawhqtatfhbc;

    alter table RENDITION 
        drop constraint FK_aw8vtq9lh7ehwfu0oc30q0hqn;

    alter table RENDITION 
        drop constraint FK_l7rl4ulhh823p0t9oswg761c9;

    drop table CONTENT_STREAM;

    drop table OBJECT_DATA;

    drop table PROPERTY_DATA;

    drop table RELATIONSHIPS;

    drop table RENDITION;

    drop table REPOSITORY_DEFINITION;
