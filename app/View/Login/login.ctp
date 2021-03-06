<?php
// MIT license
// Based on https://bootsnipp.com/snippets/zD9xl
?>

<div class="login-screen">
    <figure>
        <figcaption>Photo by SpaceX on Unsplash</figcaption>
    </figure>
    <figure>
        <figcaption>Photo by NASA on Unsplash</figcaption>
    </figure>
</div>
<div class="container-fluid">
    <div class="row">
        <div id="particles-js" class="col-xs-12 col-sm-5 col-md-4"></div>
    </div>
</div>

<div class="login-center">
    <div class="container min-height" style="padding-top: 20px;">
        <div class="row">
            <div class="col-xs-12">
                <?php echo $this->Flash->render(); ?>
                <?php echo $this->Flash->render('auth'); ?>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-5 col-sm-5 col-md-4  hidden-xs text-center slogan">
                <h1><?php echo h('openITCOCKPIT'); ?></h1>
                <h3><?php echo h(ucfirst(Configure::read('general.site_name'))); ?></h3>
            </div>
            <div class="col-xs-4 col-md-offset-4">
                <div class="login" id="card">
                    <div class="front signin_form">
                        <p><?php echo __('Login'); ?></p>
                        <?php echo $this->Form->create('LoginUser', [
                            'url'           => '/login/login',
                            'id'            => 'login-form',
                            'class'         => 'login-form',
                            'inputDefaults' => [
                                'wrapInput' => false,
                                'label'     => false,
                                'div'       => false,
                            ],
                        ]); ?>

                        <?php if ($displayMethod === true): ?>
                            <div class="form-group">
                                <?php echo $this->Form->input('auth_method', [
                                    'options'       => $authMethods,
                                    'selected'      => $selectedMethod,
                                    'class'         => 'method',
                                    'inputDefaults' => [
                                        'wrapInput' => false,
                                        'label'     => false,
                                        'div'       => false,
                                    ],
                                ]); ?>
                            </div>
                        <?php endif; ?>

                        <div class="form-group">
                            <div class="input-group">
                                <?php echo $this->Form->input('email', [
                                    'class'         => 'form-control',
                                    'placeholder'   => __('Type your email'),
                                    'type'          => 'email',
                                    'inputDefaults' => [
                                        'wrapInput' => false,
                                        'label'     => false,
                                        'div'       => false,
                                    ]
                                ]); ?>
                                <span class="input-group-addon">
                                    <i class="fa fa-lg fa-user"></i>
                                </span>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="input-group">
                                <?php echo $this->Form->input('samaccountname', [
                                    'class'         => 'form-control',
                                    'placeholder'   => __('Type your LDAP username'),
                                    'type'          => 'email',
                                    'inputDefaults' => [
                                        'wrapInput' => false,
                                        'label'     => false,
                                        'div'       => false,
                                    ]
                                ]); ?>
                                <span class="input-group-addon">
                                    <i class="fa fa-lg fa-user"></i>
                                </span>
                            </div>
                        </div>


                        <div class="form-group">
                            <div class="input-group">
                                <?php echo $this->Form->input('password', [
                                    'class'         => 'form-control',
                                    'placeholder'   => __('Type your password'),
                                    'type'          => 'password',
                                    'inputDefaults' => [
                                        'wrapInput' => false,
                                        'label'     => false,
                                        'div'       => false,
                                    ]
                                ]); ?>
                                <span class="input-group-addon">
                                    <i class="fa fa-lg fa-user"></i>
                                </span>
                            </div>
                        </div>

                        <div class="checkbox">
                            <?php echo $this->Form->input('remember_me', [
                                'type'  => 'checkbox',
                                'label' => __('Remember me on this computer'),
                            ]);
                            ?>
                        </div>

                        <div class="form-group sign-btn">
                            <button type="submit" class="btn btn-primary pull-right">
                                <?php echo __('Sign in'); ?>
                            </button>
                        </div>
                        <?php echo $this->Form->end(); ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<div class="footer">
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-12">
                <a href="https://openitcockpit.io/" target="_blank" class="btn btn-default">
                    <i class="fa fa-lg fa-globe"></i>
                </a>
                <a href="https://github.com/it-novum/openITCOCKPIT" target="_blank" class="btn btn-default">
                    <i class="fa fa-lg fa-github"></i>
                </a>
                <a href="https://twitter.com/openITCOCKPIT" target="_blank" class="btn btn-default">
                    <i class="fa fa-lg fa-twitter"></i>
                </a>
            </div>
        </div>
    </div>
</div>


