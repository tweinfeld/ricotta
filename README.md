# ricotta
Extend Source Objects According to a Given Field-map

# Usage

Ricotta is useful for extending your hierarchical "config.json" file using ENV flat settings.

ricotta.extendByMapFactory(fieldMap)=>(sourceObj, extensionObj)=>sourceObj

# Installation

This library is 100% ES5 compatible, no deps.

``npm install ricotta``

# Example

```javascript

    var ricotta = require('ricotta');

    // extendByMapFactory receives a field map, returns (sourceObj, extensionObj)=>sourceObj
    var extender = ricotta.extendByMapFactory({
        "MY_ENV_KEY_1": "key1",
        "MY_ENV_KEY_2_1": "key2.key1",
        "MY_ENV_KEY_3": "key2.key3",
        "MY_ENV_KEY_4": "key2.key4.key5"
    });

    var env = process.env || {
        "MY_ENV_KEY_1": "This is the value of key1",
        "MY_ENV_KEY_2_1": "This is the value of key2.key1",
        "MY_ENV_KEY_3": "This will be mapped only if the destination exists (yes)",
        "MY_ENV_KEY_4": "This will be mapped only if the destination exists (no)",
    };

    var baseConfig = require('config.json') || {
        "key1": "My setting",
        "key2": {
            "key1": "My first nested setting",
            "key2": "My second nested setting",
            "key3": {}
        }
    };

    extender(baseConfig, env);
    console.log(baseConfig);

	//    	{
	//			key1: 'This is the value of key1',
	//			key2:
	//		   		{
	//					key1: 'This is the value of key2.key1',
	//     				key2: 'My second nested setting',
	//     				key3: 'This will be mapped only if the destination exists (yes)'
	//				}
	//		}
```