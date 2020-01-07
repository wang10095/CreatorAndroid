package com.example.creatorandroid;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {



    private Button btnAwalong ;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //根据ID寻找一个组件
        btnAwalong = findViewById(R.id.btn_awl);
        //设置点击监听
        btnAwalong.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {


        if(v.getId() == R.id.btn_awl){
            //如果该组件的ID为阿瓦隆按钮的ID，则启动阿瓦隆
            startAWL();
        }
    }

    /**
     * 启动阿瓦隆
     */
    private void startAWL(){
        Intent intent = new Intent(MainActivity.this,GameActivity.class);
        startActivity(intent);

        GameActivity.hideCocosGame();
    }
}
