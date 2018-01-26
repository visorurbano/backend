# WsdlToPhp WsSecurity
[![License](https://poser.pugx.org/wsdltophp/wssecurity/license)](https://packagist.org/packages/wsdltophp/wssecurity)
[![Latest Stable Version](https://poser.pugx.org/wsdltophp/wssecurity/version.png)](https://packagist.org/packages/wsdltophp/wssecurity)
[![Build Status](https://api.travis-ci.org/WsdlToPhp/WsSecurity.svg)](https://travis-ci.org/WsdlToPhp/WsSecurity)
[![PHP 7 ready](http://php7ready.timesplinter.ch/WsdlToPhp/PackageGenerator/badge.svg)](https://travis-ci.org/WsdlToPhp/PackageGenerator)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/WsdlToPhp/WsSecurity/badges/quality-score.png)](https://scrutinizer-ci.com/g/WsdlToPhp/WsSecurity/)
[![Code Coverage](https://scrutinizer-ci.com/g/WsdlToPhp/WsSecurity/badges/coverage.png)](https://scrutinizer-ci.com/g/WsdlToPhp/WsSecurity/)
[![Total Downloads](https://poser.pugx.org/wsdltophp/wssecurity/downloads)](https://packagist.org/packages/wsdltophp/wssecurity)
[![Dependency Status](https://www.versioneye.com/user/projects/5615103ca19334001e000331/badge.svg?style=flat)](https://www.versioneye.com/user/projects/5615103ca19334001e000331)
[![StyleCI](https://styleci.io/repos/43811404/shield)](https://styleci.io/repos/43811404)
[![SensioLabsInsight](https://insight.sensiolabs.com/projects/1cc28292-0f49-47eb-b2ca-4bdd6c0223f1/mini.png)](https://insight.sensiolabs.com/projects/1cc28292-0f49-47eb-b2ca-4bdd6c0223f1)

## How to use it
This repository contains multiple classes that may be used indepdently but for now it is easier/better to only use the WsSecurity class.

The WsSecurity class provides a static method that takes the parameters that should suffice to create your Ws-Security Username Authentication header required in your SOAP request.

Concretly, you must include this repository in your project using composer (`composer require wsdltophp/wssecurity:dev-master`) then use it such as:

```php
use WsdlToPhp\WsSecurity\WsSecurity;

/**
 * @var \SoapHeader
 */
$soapHeader = WsSecurity::createWsSecuritySoapHeader('login', 'password', true);
/**
 * Send the request
 */
$soapClient = new \SoapClient('wsdl_url');
$soapClient->__setSoapHeaders($soapHeader);
$client->__soapCall('echoVoid', null);
```

The `WsSecurity::createWsSecuritySoapHeader` parameters are defined in this order `($username, $password, $passwordDigest = false, $addCreated = 0, $addExpires = 0, $returnSoapHeader = true, $mustunderstand = false, $actor = null, $usernameId = null)`:

- **$username**: your login/username
- **$password**: your password
- **$passwordDigest**: set it to `true` if your password must be encrypted
- **$addCreated**: set it to the time you created this header using the PHP [time](http://php.net/manual/en/function.time.php) function for example, otherwise pass 0
- **$addExpires**: set it to the number of seconds in which the header will expire, 0 otherwise
- **$returnSoapHeader**: set it to false if you want to get the [\SoapVar](http://php.net/manual/en/class.soapvar.php) object that is used to create the [\SoapHeader](http://php.net/manual/en/class.soapheader.php) object, then you'll have to use to create by yourself the [\SoapHeader](http://php.net/manual/en/class.soapheader.php) object
- **$mustunderstand**: classic option of the [\SoapClient](http://php.net/manual/en/soapclient.soapclient.php) class
- **$actor**: classic option of the [\SoapClient](http://php.net/manual/en/soapclient.soapclient.php) class
- **$usernameId**: the id to attach to the UsernameToken element, optional

## Unit tests
You can run the unit tests with the following command at the root directory of this project:
```
$ phpunit
```

## Feedback
Any feedback is appreciated at contact@wsdltophp.com or by creating an issue on this project.

