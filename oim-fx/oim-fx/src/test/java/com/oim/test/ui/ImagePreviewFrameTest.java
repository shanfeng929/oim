/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oim.test.ui;

import com.oim.fx.common.box.ImageBox;
import com.oim.ui.fx.classics.ImagePreviewFrame;

import javafx.application.Application;
import javafx.scene.image.Image;
import javafx.stage.Stage;

/**
 *
 * @author Only
 */
public class ImagePreviewFrameTest extends Application {

	ImagePreviewFrame auf=new ImagePreviewFrame();
    @Override
    public void start(Stage primaryStage) {
    	auf.show();
    	Image image = ImageBox.getImagePath("Resources/Images/Wallpaper/0.jpg");
    	auf.setImage(image);
    }

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        launch(args);
    }

}
