/*************************************************************
 * 以下接口中地址'http://api.oimchat.com'部分按具体服务地址修改， *
 * 这里只是我自己的服务地址。注意这里的文件相关的接口，在聊天过程中， *
 * 并不是上传了文件，对方就能收到文件了，也不是上传了头像就修改了头像 *
 * 而是上传文件后，把服务器返回的文件id、name、size、url等信息发送给*
 * 对方，上传头像后执行修改头像接口操作等。所以其实用其他的文件服务也 *
 * 是没问题的                                                  *
 * ***********************************************************/

/*-------------------------------------------------------------------------------------------*/
/*************************************************************/
/**
 * 接口名称：文件上传接口<br>
 * 方法：POST<br>
 * 功能：上传文件接口，返回路径和id等信息<br>
 * 说明：表单input的name为file
 * url:http://api.oimchat.com/file/v1/upload<br>
 */

//请求示例
var url = 'http://api.oimchat.com/file/v1/upload?userId=xxxxxxxxxx';
/**
 * 返回数据结构
 */
var response = {
    "info": {
        "success": true,
        "errors": [],
        "warnings": []
    },
    "body": {
        "data": {
            "id": "u8as381jah42323hh",//这里返回的id可以用下面下载接口下载（由于老板本客户端只支持下载接口下载）
            "name": "oim.exe",
            "size": 1000312120,
            "url": "http://www.oimchat.com/file/oim.exe"//这里返回的url可以直接用于下载
        }
    }
};


/*************************************************************/
/**
 * 接口名称：文件下载<br>
 * 方法：POST<br>
 * 功能：下载文件<br>
 * 说明：这里需要用上传文件时返回的id<br>
 * url:http://api.oimchat.com/file/v1/download<br>
 */
//请求示例
var url = 'http://api.oimchat.com/file/v1/download?id=u8as381jah42323hh';
/*-------------------------------------------------------------------------------------------*/






/*-------------------------------------------------------------------------------------------*/

/*************************************************************/
/**
 * 接口名称：用户头像上传<br>
 * 方法：POST<br>
 * 功能：<br>
 * 说明：<br>
 * url:http://api.oimchat.com/file/v1/head/user/upload<br>
 */

//请求示例
var url = 'http://api.oimchat.com/file/v1/head/user/upload?userId=xxxxxxxxxx';
/**
 * 返回数据结构同文件上传
 */

/*************************************************************/
/**
 * 接口名称：用户头像下载<br>
 * 方法：POST<br>
 * 功能：<br>
 * 说明：<br>
 * url:http://api.oimchat.com/file/v1/head/user/download<br>
 */
//请求示例
var url = 'http://api.oimchat.com/file/v1/head/user/download?id=xxxxxxxxxx';

/*-------------------------------------------------------------------------------------------*/






/*-------------------------------------------------------------------------------------------*/
/*************************************************************/
/**
 * 接口名称：群头像上传<br>
 * 方法：POST<br>
 * 功能：<br>
 * 说明：<br>
 * url:http://api.oimchat.com/file/v1/head/group/upload<br>
 */

//请求示例
var url = 'http://api.oimchat.com/file/v1/head/group/upload?userId=uuuuuuuuu&groupId=ggggggggggg';
/**
 * 返回数据结构同文件上传
 */

/*************************************************************/
/**
 * 接口名称：群头像下载<br>
 * 方法：POST<br>
 * 功能：<br>
 * 说明：<br>
 * url:http://api.oimchat.com/file/v1/head/group/download<br>
 */
//请求示例
var url = 'http://api.oimchat.com/file/v1/head/group/download?id=xxxxxxxxxx';
/*-------------------------------------------------------------------------------------------*/








/*-------------------------------------------------------------------------------------------*/

/*************************************************************/
/**
 * 接口名称：聊天图片上传<br>
 * 方法：POST<br>
 * 功能：<br>
 * 说明：<br>
 * url:http://api.oimchat.com/file/v1/image/upload<br>
 */

//请求示例
var url = 'http://api.oimchat.com/file/v1/image/upload?userId=xxxxxxxxxx';
/**
 * 返回数据结构同文件上传
 */

/*************************************************************/
/**
 * 接口名称：聊天图片下载<br>
 * 方法：POST<br>
 * 功能：<br>
 * 说明：<br>
 * url:http://api.oimchat.com/file/v1/image/download<br>
 */
//请求示例
var url = 'http://api.oimchat.com/file/v1/image/download?id=xxxxxxxxxx';
/*-------------------------------------------------------------------------------------------*/