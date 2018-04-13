package com.example.android.truck_loc;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.Charset;

public class MainActivity extends AppCompatActivity {

    Button startJourneyButton;
    private EditText inputEmail, inputPassword;
    private ProgressBar progressBar;
    String email;
    String password;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        setTitle("Login");

        startJourneyButton = findViewById(R.id.start_journey);
        inputEmail =  findViewById(R.id.email);
        inputPassword = findViewById(R.id.password);
        progressBar = findViewById(R.id.progressBar);

        startJourneyButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {


                email = inputEmail.getText().toString();
                password = inputPassword.getText().toString();

                if (TextUtils.isEmpty(email)) {
                    Toast.makeText(getApplicationContext(), "Enter Truck id!", Toast.LENGTH_SHORT).show();
                    return;
                }

                if (TextUtils.isEmpty(password)) {
                    Toast.makeText(getApplicationContext(), "Enter password!", Toast.LENGTH_SHORT).show();
                    return;
                }

                progressBar.setVisibility(View.VISIBLE);

                asyncTask task = new asyncTask();
                task.execute();

            }
        });

    }

    private class asyncTask extends AsyncTask<String, Void, String> {
        @Override
        protected void onPreExecute() {
            super.onPreExecute();
        }

        @RequiresApi(api = Build.VERSION_CODES.KITKAT)
        @Override
        protected String doInBackground(String... params) {
            URL url = null;
            HttpURLConnection urlConnection = null;
            StringBuilder output = new StringBuilder();
            String jsonResponse = "";
            String urlParameters  = "driver_id=" + email + "&password=" + password;
            byte[] postData       = urlParameters.getBytes(Charset.forName("UTF-8"));
            int postDataLength = postData.length;
            try {
                url = new URL("http://192.168.43.183:3000/truckLogin/app");
            } catch (MalformedURLException e) {
                return null;
            }

            try {
                urlConnection = (HttpURLConnection) url.openConnection();
                urlConnection.setReadTimeout(10000);
                urlConnection.setConnectTimeout(15000);
                urlConnection.setRequestMethod("POST");
                urlConnection.setRequestProperty( "Content-Type", "application/x-www-form-urlencoded");
                urlConnection.setRequestProperty( "charset", "utf-8");
                urlConnection.setRequestProperty( "Content-Length", Integer.toString( postDataLength ));
                urlConnection.setUseCaches( false );
                try( DataOutputStream wr = new DataOutputStream( urlConnection.getOutputStream())) {
                    wr.write( postData );
                }
                urlConnection.connect();
                InputStreamReader inputStreamReader = new InputStreamReader(urlConnection.getInputStream(), Charset.forName("UTF-8"));
                BufferedReader reader = new BufferedReader(inputStreamReader);
                String line = reader.readLine();
                if (line != null)
                    output.append(line);
                reader.close();
                jsonResponse = output.toString();

            } catch (IOException e) {
                return null;
            } finally {
                if (urlConnection != null)
                    urlConnection.disconnect();
            }
            return jsonResponse;
        }

        @Override
        protected void onPostExecute(String response) {
            super.onPostExecute(response);
            if (response == null) { return;
            } else {
                JSONObject jsonObject = null;
                try {
                    jsonObject = new JSONObject(response);
                    JSONObject message = jsonObject.getJSONObject("message");
                    String address = message.optString("address");
                    String userName = message.optString("user_name");
                    String driver_id = message.optString("driver_id");

                    progressBar.setVisibility(View.INVISIBLE);

                    Intent intent = new Intent(MainActivity.this, MapsActivity.class);
                    intent.putExtra("address", address);
                    intent.putExtra("user_name", userName);
                    intent.putExtra("driver_id", driver_id);
                    startActivity(intent);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

        }
    }
}
