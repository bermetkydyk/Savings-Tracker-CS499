PGDMP         %                x            CoinDB    13.0    13.0      �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16394    CoinDB    DATABASE     l   CREATE DATABASE "CoinDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE "CoinDB";
                postgres    false            �            1259    16489    user_expenses    TABLE     �  CREATE TABLE public.user_expenses (
    "expenseId" integer NOT NULL,
    "userId" integer NOT NULL,
    "expenseMonthly" double precision,
    description character varying(200),
    "realAmount" double precision NOT NULL,
    "realFrequency" character varying(50),
    "createdAt" date,
    "updatedAt" date,
    "expenseType" character varying(200) NOT NULL,
    "expenseMonth" integer NOT NULL,
    "expenseYear" integer NOT NULL
);
 !   DROP TABLE public.user_expenses;
       public         heap    postgres    false            �            1259    16492    user_expenses_expense_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_expenses_expense_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.user_expenses_expense_id_seq;
       public          postgres    false    200            �           0    0    user_expenses_expense_id_seq    SEQUENCE OWNED BY     ^   ALTER SEQUENCE public.user_expenses_expense_id_seq OWNED BY public.user_expenses."expenseId";
          public          postgres    false    201            �            1259    16494 
   user_goals    TABLE     �  CREATE TABLE public.user_goals (
    "goalId" integer NOT NULL,
    "userId" integer NOT NULL,
    "amountNeeded" double precision NOT NULL,
    description character varying,
    "reachByDate" date NOT NULL,
    progress double precision,
    "createdAt" date,
    "updatedAt" date,
    priority integer,
    title character varying NOT NULL,
    "isComplete" character varying NOT NULL,
    "savingsTowardsGoal" double precision
);
    DROP TABLE public.user_goals;
       public         heap    postgres    false            �            1259    16500    user_goals_goal_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_goals_goal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.user_goals_goal_id_seq;
       public          postgres    false    202            �           0    0    user_goals_goal_id_seq    SEQUENCE OWNED BY     R   ALTER SEQUENCE public.user_goals_goal_id_seq OWNED BY public.user_goals."goalId";
          public          postgres    false    203            �            1259    16502    user_income    TABLE     �  CREATE TABLE public.user_income (
    "incomeId" integer NOT NULL,
    "userId" integer NOT NULL,
    "incomeMonthly" double precision,
    "incomeType" character varying(50) NOT NULL,
    description character varying(200),
    "realAmount" double precision NOT NULL,
    "realFrequency" character varying(50),
    "createdAt" date,
    "updatedAt" date,
    "incomeMonth" integer NOT NULL,
    "incomeYear" integer NOT NULL
);
    DROP TABLE public.user_income;
       public         heap    postgres    false            �            1259    16505    user_income_income_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_income_income_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.user_income_income_id_seq;
       public          postgres    false    204            �           0    0    user_income_income_id_seq    SEQUENCE OWNED BY     X   ALTER SEQUENCE public.user_income_income_id_seq OWNED BY public.user_income."incomeId";
          public          postgres    false    205            �            1259    16507    users    TABLE     u  CREATE TABLE public.users (
    id integer NOT NULL,
    "googleId" character varying NOT NULL,
    username character varying(200) NOT NULL,
    email character varying(100) NOT NULL,
    "totalBalance" double precision,
    "createdAt" date,
    "updatedAt" date,
    "fullName" character varying,
    "familyName" character varying,
    "givenName" character varying
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16513    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    206            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    207            6           2604    16515    user_expenses expenseId    DEFAULT     �   ALTER TABLE ONLY public.user_expenses ALTER COLUMN "expenseId" SET DEFAULT nextval('public.user_expenses_expense_id_seq'::regclass);
 H   ALTER TABLE public.user_expenses ALTER COLUMN "expenseId" DROP DEFAULT;
       public          postgres    false    201    200            7           2604    16516    user_goals goalId    DEFAULT     y   ALTER TABLE ONLY public.user_goals ALTER COLUMN "goalId" SET DEFAULT nextval('public.user_goals_goal_id_seq'::regclass);
 B   ALTER TABLE public.user_goals ALTER COLUMN "goalId" DROP DEFAULT;
       public          postgres    false    203    202            8           2604    16517    user_income incomeId    DEFAULT        ALTER TABLE ONLY public.user_income ALTER COLUMN "incomeId" SET DEFAULT nextval('public.user_income_income_id_seq'::regclass);
 E   ALTER TABLE public.user_income ALTER COLUMN "incomeId" DROP DEFAULT;
       public          postgres    false    205    204            9           2604    16518    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    206            �          0    16489    user_expenses 
   TABLE DATA           �   COPY public.user_expenses ("expenseId", "userId", "expenseMonthly", description, "realAmount", "realFrequency", "createdAt", "updatedAt", "expenseType", "expenseMonth", "expenseYear") FROM stdin;
    public          postgres    false    200   1(       �          0    16494 
   user_goals 
   TABLE DATA           �   COPY public.user_goals ("goalId", "userId", "amountNeeded", description, "reachByDate", progress, "createdAt", "updatedAt", priority, title, "isComplete", "savingsTowardsGoal") FROM stdin;
    public          postgres    false    202   )       �          0    16502    user_income 
   TABLE DATA           �   COPY public.user_income ("incomeId", "userId", "incomeMonthly", "incomeType", description, "realAmount", "realFrequency", "createdAt", "updatedAt", "incomeMonth", "incomeYear") FROM stdin;
    public          postgres    false    204   �*       �          0    16507    users 
   TABLE DATA           �   COPY public.users (id, "googleId", username, email, "totalBalance", "createdAt", "updatedAt", "fullName", "familyName", "givenName") FROM stdin;
    public          postgres    false    206   ,       �           0    0    user_expenses_expense_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.user_expenses_expense_id_seq', 148, true);
          public          postgres    false    201            �           0    0    user_goals_goal_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.user_goals_goal_id_seq', 54, true);
          public          postgres    false    203            �           0    0    user_income_income_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.user_income_income_id_seq', 201, true);
          public          postgres    false    205            �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 4, true);
          public          postgres    false    207            ;           2606    16520     user_expenses user_expenses_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.user_expenses
    ADD CONSTRAINT user_expenses_pkey PRIMARY KEY ("expenseId");
 J   ALTER TABLE ONLY public.user_expenses DROP CONSTRAINT user_expenses_pkey;
       public            postgres    false    200            =           2606    16522    user_goals user_goals_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.user_goals
    ADD CONSTRAINT user_goals_pkey PRIMARY KEY ("goalId");
 D   ALTER TABLE ONLY public.user_goals DROP CONSTRAINT user_goals_pkey;
       public            postgres    false    202            ?           2606    16524    user_income user_income_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.user_income
    ADD CONSTRAINT user_income_pkey PRIMARY KEY ("incomeId");
 F   ALTER TABLE ONLY public.user_income DROP CONSTRAINT user_income_pkey;
       public            postgres    false    204            A           2606    16526    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    206            �   �   x���M�0���)zL���b\z6!Vj
.��`cR��4餙��oހ����F)�7�0"�4�n��	�XYbd^�$&'w�uM�І$�h$9����1j/t��d*�A�,�|0G���j�5���~��.����O��J)r�B5�?@��4��$��r�
�Ej|���I-\�Z�¼�)��n�MHw�u�6      �   �  x����R� ���)��d���؛O��I�̴��D���I ��h�D�Ƿ�S��}#7����K���Fl	�. �����	b��ٌ�"a?6�Y�!
�²�����݉�V�6����?PGEc��u�i�xd��6qc�r`��g6I/�K/� GT ����I�U]����i-���8g4��B��"�咨������8�K&8�q��P�F�y�ڄ�X�&fZ.�S�8]�F_�������Y�(����}�Wo]��^�q���Ӳ��^^�E���"}�)����=��ߊ|�[�K|u��V)��<����b4�#���q]��e(���A��B�mѩ,Q�b]�f[��;rZvv�&ۜk�A<��c]*p��d��9M�+�\������� ����      �   \  x���Mn�0F��� Ռ�6^w�MU�Yf�)(Gح�ۗ�9M���x���L8A�}%&=�͉lrc�N�0 ��0`"Q�%b`"@���lʣ!|�s�1�}��}.�l?�wr��j`��W��*�-y�3]�t������^hK�<
��Pl���"�邯�B��B��"��B-w!I� ����ڢ4�ҵ-��0��-~G��A>�����H�z�1,��H�[��<�p'��	�zK\�7�������.��-�m�7�v��n}]U�u��>M�вO��V�C�#�{#od鍜x#+_d����|���I��r�R�L�u���c_˫�}
���ip�      �   �   x���Mk�@�ϓ_�H��ݝ�[ś���sI�5Zc�P���T�TZ���w�% �hY�ő�q�^�&������.�{iNա-���s�i��d�(���*q"���;X���f���sю��p���F�^�8O��b)8�����Uu�W���z���L?�7�I*M����kԡ>W֎���7�s|�,�,��j>     