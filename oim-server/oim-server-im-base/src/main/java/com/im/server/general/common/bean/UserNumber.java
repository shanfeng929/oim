package com.im.server.general.common.bean;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * 描述： 因为用户账号与用户Id不是同一字段，当用户注册的时候用来生成账号
 * 
 * @author XiaHui
 * @date 2014-06-15 14:17:07
 * @version 0.0.1
 */
@Entity(name = "im_user_number")
public class UserNumber {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private Date createTime;// 建立时间

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

}
