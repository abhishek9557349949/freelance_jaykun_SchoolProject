package com.eureka_server.services.connectionmanager;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionManager {
	
    private static final String URL = "jdbc:mysql://localhost:3306/clg_app";
    private static final String USER = "root";
    private static final String PASSWORD = "Abhi@123";
    
	public Connection createConnection(){
		Connection connection = null;
		try {
			connection = DriverManager.getConnection(URL, USER, PASSWORD);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return connection;
	}
	
	public void destroyConnection(Connection connection){
		try {
			if(connection != null) {
				connection.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
