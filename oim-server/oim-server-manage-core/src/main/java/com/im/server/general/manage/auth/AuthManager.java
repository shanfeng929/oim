package com.im.server.general.manage.auth;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import org.springframework.stereotype.Service;

/**
 * date 2018-06-13 10:41:23<br>
 * description
 * 
 * @author XiaHui<br>
 * @since
 */
@Service
public class AuthManager {

	Map<String, String> map = new java.util.concurrent.ConcurrentHashMap<String, String>();

	public String putToken(String userId) {
		String token = createAccessToken(userId);
		return map.put(userId, token);
	}

	public boolean isAuth(String token) {
		boolean auth = map.containsValue(token);
		return auth;
	}

	public static String createAccessToken(String userId) {
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddhhssmm");
		String dateTime = df.format(new Date());
		return getHash(dateTime + userId, "MD5");
	}

	public static String getHash(String source, String hashType) {
		// 用来将字节转换成 16 进制表示的字符
		char hexDigits[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };

		try {
			MessageDigest md = MessageDigest.getInstance(hashType);
			md.update(source.getBytes()); // 通过使用 update 方法处理数据,使指定的 byte数组更新摘要
			byte[] encryptStr = md.digest(); // 获得密文完成哈希计算,产生128 位的长整数
			char str[] = new char[16 * 2]; // 每个字节用 16 进制表示的话，使用两个字符
			int k = 0; // 表示转换结果中对应的字符位置
			for (int i = 0; i < 16; i++) { // 从第一个字节开始，对每一个字节,转换成 16 进制字符的转换
				byte byte0 = encryptStr[i]; // 取第 i 个字节
				str[k++] = hexDigits[byte0 >>> 4 & 0xf]; // 取字节中高 4 位的数字转换, >>>
															// 为逻辑右移，将符号位一起右移
				str[k++] = hexDigits[byte0 & 0xf]; // 取字节中低 4 位的数字转换
			}
			return new String(str); // 换后的结果转换为字符串
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return null;
	}
}
