# data-bb-cxp-authentication-http-ng

A data module for accessing the CXP Authentication REST API

## Imports

* vendor-bb-angular

---

## Example

```javascript
import cXPAuthenticationDataModuleKey, {
  cXPAuthenticationDataKey,
} from 'data-bb-cxp-authentication-http-ng';
```

## Table of Contents
- **Exports**<br/>    <a href="#default">default</a><br/>    <a href="#cXPAuthenticationDataKey">cXPAuthenticationDataKey</a><br/>
- **CXPAuthenticationData**<br/>    <a href="#CXPAuthenticationData#postLogin">#postLogin(data, headers)</a><br/>    <a href="#CXPAuthenticationData#postLogout">#postLogout(headers)</a><br/>
- **CXPAuthenticationDataProvider**<br/>    <a href="#CXPAuthenticationDataProvider#setBaseUri">#setBaseUri(baseUri)</a><br/>    <a href="#CXPAuthenticationDataProvider#$get">#$get()</a><br/>

## Exports

### <a name="default"></a>*default*

Angular dependency injection module key

**Type:** *String*

### <a name="cXPAuthenticationDataKey"></a>*cXPAuthenticationDataKey*

Angular dependency injection key for the CXP Authentication data service

**Type:** *String*


---

## CXPAuthenticationData

Public api for service data-bb-cxp-authentication-http

### <a name="CXPAuthenticationData#postLogin"></a>*#postLogin(data, headers)*

Perform a POST request to the URI.

| Parameter | Type | Description |
| :-- | :-- | :-- |
| data | Object | configuration object |
| headers | Object | custom headers |

##### Returns

Promise of Object - *A promise resolving to object with headers and data keys*

## Example

```javascript
cXPAuthenticationData
 .postLogin(data, headers)
 .then(function(result){
   console.log(result)
 });
```

### <a name="CXPAuthenticationData#postLogout"></a>*#postLogout(headers)*

Perform a POST request to the URI.

| Parameter | Type | Description |
| :-- | :-- | :-- |
| headers | Object | custom headers |

##### Returns

Promise of Object - *A promise resolving to object with headers and data keys*

## Example

```javascript
cXPAuthenticationData
 .postLogout(headers)
 .then(function(result){
   console.log(result)
 });
```

---

## CXPAuthenticationDataProvider

Data service that can be configured with custom base URI.

### <a name="CXPAuthenticationDataProvider#setBaseUri"></a>*#setBaseUri(baseUri)*


| Parameter | Type | Description |
| :-- | :-- | :-- |
| baseUri | String | Base URI which will be the prefix for all HTTP requests |

### <a name="CXPAuthenticationDataProvider#$get"></a>*#$get()*


##### Returns

Object - *An instance of the service*

## Example

```javascript
angular.module(...)
  .config(['data-bb-cxp-authentication-http-ng:cXPAuthenticationDataProvider',
    (dataProvider) => {
      dataProvider.setBaseUri('http://my-service.com/');
      });
```
