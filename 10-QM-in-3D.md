---
title: "Chapter 10: Quantum mechanics in three dimensions" 
short_title: "Ch. 10: QM in 3D"
numbering:
  enumerator: 10.%s
authors:
  - name: 
    affiliations:
---

In this chapter we are now ready to move onto the study of quantum mechancis in three dimensions! Much of what we have learnt up until this stage will carry across in a rather straightforward manner, which is good news. Obviously the world around us is three dimensional, and so it is necessary to move broaden our application of quantum mechanics to three dimensions, so that we can go on to study real-world situations, for example, laying the foundations for the study of the **Hydrogen atom** — arugably the most famous quantum system of all, and one of its biggest early successes. While we won't get all the way there in this unit, we will nevertheless introduce the basics of quantum mechancis in 3D, so that you will be able to go straight there next year. 

## The position of a particle in 3D

We will largely follow the same path in 3D that we followed in 1D, and start off with the most basic of all properties of a particle: its **position**. One of the biggest changes in 3D compared to 1D is that many physical quantities now become **vectors**, and the position is the first of these. In order to specify a point in space, we now need to use the **position vector** $\mathbf{r}$, 
```{math}
\rvec = x \ivec + y \jvec + z \kvec = (x,y,z).
```
Just as before we associated a quantum state to each position $x$, we will now introduce a **3D position states** as $\ket{\rvec}$, and an associated **3D spatial wavefunction** $\psi(\rvec)$, such that a general quantum state of a particle in three dimensions can be written as
````{card}
```{math}
\ket{\psi} = \infint \infint \infint \psi(\rvec) \ket{\rvec} d^3\rvec,
```
````
which should be compared to [](#e-general-quantum-state). 
```{aside} *Notation for vectors and 3D integrals*
*We will write mostly use the notation $\rvec = (x,y,z)$ as  convenient shorthand for 3D vectors, instead of $\rvec = x \ivec + y \jvec + z \kvec$, which proves more cumbersome in general. In this way, we can write $\psi(\rvec)$ and $\psi(x,y,z)$ interchangably, as both should make sense. We will exclusively use **boldface** in the lecture notes for vectors, instead of $\vec{r}$.*

*We will also use the notation $d^3\rvec$ for the **volume element** $dx dy dz$. Previously you have seen this as $d\tau$. Both are common (Griffiths for example uses the former, and we will follow their notation here).*

*Finally, we will often simply write $\int_V f(\rvec) d^3\rvec$ in place of $\infint \infint \infint f(\rvec) d^3\rvec$, to indicate an integration over **all space** when this will not cause any confusion.*
```
This state corresponds to a **superposition** of the particle being at position $\rvec$. The 3D position states $\ket{\rvec}$ are **unphysical states**, which satisfy the orthogonality and normalisation condition
````{card}
```{math}
\inner{\rvec'}{\rvec} = \delta^{(3)}(\rvec-\rvec'),
```
````
where $\delta^{(3)}(\rvec-\rvec')$ is the **3D Dirac delta function**, given by
```{math}
\delta^{(3)}(\rvec-\rvec') = \delta(x-x')\delta(y-y')\delta(z-z'),
```
i.e. it is the **product** of three delta functions, one for each coordinate. Using the 3D delta function, as an exercise you will show that the normalisation condition $\| \ket{\psi} \|^2 = 1$, in terms of the wavefunction $\psi(\rvec)$ becomes
````{card}
```{math}
:label: e-norm-3D-wf
\int_V|\psi(\rvec)|^2 d^3\rvec = 1,
```
````
which should be compared to [](#e-norm-wavefunction).  The **interpretation** of this equation is in fact identical to the interpretation we gave to [](#e-norm-wavefunction). However, to arrive at this, we first need to introduce **operators** corresponding to the **coordinates** of the particle. 

### Position and coordinate operators

One new question that arises in 3D with the introduction of **vector quantities** is *how to associate operators to them?* It turns out that the correct way to do this is to **associate a separate operator to each component of the vector**. In the context of the **position**, this means we will associate an operator to **each coordinate** of the particle. We thus introduce 3 operators, $\hat{X}$, $\hat{Y}$ and $\hat{Z}$. The position states $\ket{\rvec}$ are **joint eigenstates of all 3 operators**, satisfying the eigenvalue equations
````{card}
```{math}
:label: e-coordinate-eigenstates
\hat{X}\ket{\rvec} &= x \ket{\rvec},& \hat{Y}\ket{\rvec} &= y \ket{\rvec},& \hat{Z}\ket{\rvec} &= z \ket{\rvec}
```
````
As you will confirm as an [exercise](#ex-degen-coordinate-ops), we now have a **vast amount of degeneracy** in these operators. Recall that **degeneracy** refers to the fact that there can be **multiple eigenvectors with the same eigenvalue**. We see that any two position states $\ket{\rvec}$ and $\ket{\rvec'}$ that have the same $x$ coordinate, but arbitrary $y$ and $z$ coordinates, will be degenerate as far as $\hat{X}$ is concerned (and similarly for $\hat{Y}$ and $\hat{Z}$). There are **infinitely many such states**. 

Just as it is convenient to combine coordinates together into a vector in classical mechanics, it is also convenient and useful to combine **operators together into a vector of operators**. In particular, we can combine the coordinate operators to form a **3D position operator** $\hat{\mathbf{R}}$, given by
````{card}
```{math}
\hat{\mathbf{R}} = (\hat{X},\hat{Y},\hat{Z}).
```
````
With this notation, we therefore see that
```{math}
:label: e-R-eig-eq-vec
\hat{\mathbf{R}}\ket{\rvec} &= (\hat{X},\hat{Y},\hat{Z})\ket{\rvec},\\
&= (x,y,z)\ket{\rvec},\\
&= \rvec \ket{\rvec},
```
where to obtain the second line we have used [](#e-coordinate-eigenstates). Apart from the fact that $\hat{\mathbf{R}}$ and $\rvec$ are **vectors**, this is exactly in the form of an **eigenvalue equation**, and this is one reason why it is useful: we see that $\ket{\rvec}$ can be viewed as the eigenvector of the 3D position operator $\hat{\mathbf{R}}$.
```{aside} *Vector eigenvalues?*
*You might be concerned by this, as it appears that we now have eigenvalues which are themselves vectors? Although this isn't a common way to view things, it does nevertheless make sense, and simply tells us in a succinct way that $\ket{\rvec}$ is a **simultaneous eigenstate** of $\hat{X}$, $\hat{Y}$ and $\hat{Z}$. So just as with many other uses of vectors, here we condense three separate equations into a **single** vector equation.* 
```

We can also introduce the **coordinate operators acting on wavefunctions** using the same prescription as before, [](#e-op-to-wf-op). Using [](e-coordinate-eigenstates), we see for example that
```{math}
\hat{X}\ket{\psi} = \int_V \psi(\rvec) x \ket{\rvec} d^3\rvec,
```
i.e. the action of the operator is to transform $\psi(\rvec)$ into $\psi'(\rvec) = x \psi(\rvec)$, and so we have $\op{X} = x$, just as before. That is, the $X$ coordinate operator multiplies a wavefunction by the coordinate $x$, as we should expect. We similarly have $\op{Y} = y$ and $\op{Z} = z$. Interesting, we can **also** combine these into a single **vector operator**. In particular, we see that
```{math}
\hat{\mathbf{R}}\ket{\psi} &= \hat{\mathbf{R}} \int_V \psi(\rvec)\ket{\rvec} d^3\rvec, \\
&= \int_V \psi(\rvec)\hat{\mathbf{R}} \ket{\rvec}d^3\rvec,\\
&= \int_V \psi(\rvec)\rvec \ket{\rvec}d^3\rvec,
```
Thus the action of the operator is to turn the wavefunction into the **vector**
```{math}
:label: e-psi-r-vec
\psi(\rvec)\rvec = (x\psi(\rvec), y\psi(\rvec), z\psi(\rvec)),
```
i.e. **each component** of $\rvec$ is multiplied by the the wavefunction $\psi(\rvec)$ (which is itself just a **scalar** quantity, being a single complex number for each position $\rvec$). Given [](#e-psi-r-vec), we therefore write
````{card}
```{math}
:label: e-wf-op-R
\op{\mathbf{R}} = \rvec
```
````

Finally, using the definitions of $\op{X}$, $\op{Y}$ and $\op{Z}$, it is also straightforward to see that the three coordinates are **compatible observables** that can therefore be **simultaneously measured** (in principle at least). Recall that the **mathematical** property behind compatibility is **commutativity**. We can easily check that the commutator of any two coordinate wavefunction operators vanishes, for example,
```{math}
[\op{X},\op{Y}]\psi(\rvec) &= (\op{X}\op{Y} - \op{Y}\op{X})\psi(\rvec),\\
&= \op{X}(y\psi(\rvec)) - \op{Y}(x\psi(\rvec)),\\
&= (xy - yx)\psi(\rvec),\\
&= 0,
``` 
from which it follows that $[\hat{X}, \hat{Y}] = 0$, according to [](#e-wf-comm-to-op-comm). 

### Probability to find a particle somewhere

We can now think about measuring the **position of the particle** in 3D, and ask *what is the probability to find it in an (arbitrarily small) region around $\rvec$? That is, if we performed an arbitrarily good simultaneous measurement of the 3 coordinates of the particle? The answer is the direct generalisation of what we saw for a particle in one dimension: the **probability density** at position $\rvec$$ is precisely
````{card}
```{math}
\pd(\rvec) = |\psi(\rvec)|^2,
```
````
so that the probability to find the particle in a small region of volume $dV$ around the point $\rvec$ is $|\psi(\rvec)|^2 dV$. We can then ask similar questions about the probability of a measurement finding the particle in a finite region, and the **total** probability in any region is obtained by **integrating** the probability density over the region. 

This then allows us to interpret the normalisation condition [](#e-norm-3D-wf) in a natural way: it says that the **total probability** to find the particle somewhere (in 3D now!) must be unity. 

## The momentum of a particle in 3D

Let us now turn our attention to the **momentum** of a particle in 3D. As with the position, the momentum is now a **vector** quantity, $\pvec = (p_x, p_y, p_z)$. In [](02-momentum) we saw that if a particle had a definite momentum $p_x$ in the $x$-direction, then the spatial wavefunction was the momentum eigenfunction $v_{p_x}(x) = \frac{1}{\sqrt{2\pi\hbar}} e^{ip_x x/\hbar}$. 

Even though we are now in 3D, we still want this to be the **behaviour of the wavefunction as $x$ varies if the particle has a definite $x$ component of momentum**. We can apply the same logic along the $y$ and $z$ directions, and this suggests that **momentum eigenfunctions** of momentum $\pvec$ should be given by
````{card}
```{math}
:label: e-3D-mom-eigenfunc
v_{\pvec}(\rvec) &= \frac{1}{(\sqrt{2\pi\hbar})^3}e^{ip_x x/\hbar}e^{ip_y y/\hbar}e^{ip_z z/\hbar},\\
&= \frac{1}{(2\pi\hbar)^{3/2}} e^{i\pvec \cdot \rvec / \hbar}
```
````
where in the second line we have realised that $p_x x + p_y y + p_z z$ (that arises when combining the exponents of the three exponential functions) can be written as the **scalar product** between $\rvec$ and $\pvec$, i.e. as $\pvec \cdot \rvec$. 

In what follows, we will see that **this is the correct definition of the 3D momentum eigenfunctions**. They correspond precisely to **3D complex plane waves** with wave vector $\mathbf{k} = \pvec/\hbar$, and **definite wavelength** $\lambda = 2\pi/|\mathbf{k}| = h/|\pvec|$. This is precisely the de Broglie relation, for a particle with momentum of magnitude $|\pvec|$. 

Having defined the momentum eigenfunctions, we can now write down — using the standard prescription — the corresponding **3D momentum eigenstates**, 
````{card}
```{math}
\ket{\pvec} &= \int_V v_{\pvec}(\rvec)\ket{\rvec}d^3\rvec,\\
&= \frac{1}{(2\pi\hbar)^{3/2}} \int_V e^{i\pvec \cdot \rvec / \hbar} \ket{\rvec} d^3\rvec.
```
````

These states are also **unphysical** and satisfy the same orthogonality-normalisation condition as the 3D position states $\ket{\rvec}$, namely
````{card}
```{math}
\inner{\pvec'}{\pvec} = \delta^{(3)}(\pvec - \pvec').
```
````

We can use the momentum eigenstates in order to introduce the **3D momentum wavefunction**, in exactly analogy to [](#e-general-state-momentum)
````{card}
```{math}
\ket{\psi} = \int_V \tilde{\psi}(\pvec) \ket{\pvec} d^3 \pvec,
```
````
i.e. it is the way that we can express an **arbitrary state** as a **superposition** of momentum states. 

### Momentum operator

Just as for the position, we will need to introduce **one momentum operator for each component of momentum**, and we can **collect these together** into a single **vector momentum operator**,
````{card}
```{math}
\hat{\mathbf{P}} = (\hat{P}_x, \hat{P}_y, \hat{P}_z).
```
````
Momentum eigenstates will then be — by definition — joint eigenstates of each component momentum operator, i.e. 
```{math}
\hat{P}_x \ket{\pvec} &= p_x \ket{\pvec},& \hat{P}_y \ket{\pvec} &= p_y \ket{\pvec},& \hat{P}_z \ket{\pvec} &= p_z \ket{\pvec}.
```
We can again write this in a succint way as
```{math}
\hat{\mathbf{P}}\ket{\pvec} &= \pvec \ket{\pvec},
```
just as we did in [](#e-R-eig-eq-vec) for the 3D position operator $\hat{\mathbf{R}}$. 

*What about the wavefunction operator $\op{\mathbf{P}}$*? Well, for the position operator, we saw in [](#e-wf-op-R) that we in fact **kept the same wavefunction operator as we had in 1D**. Namely, we just multiplied by the coordinate. This suggests that for momentum we might have the same: that each component of the momentum operator should be specified the same way as in 1D, as in [](#e-op-P). We will thus take
````{card}
```{math}
\op{\mathbf{P}} &= \left(-i\hbar \frac{\partial}{\partial x}, -i\hbar \frac{\partial}{\partial y}, -i\hbar \frac{\partial}{\partial z}\right),\\
&= -i\hbar \boldsymbol{\nabla}.
```
````
As an exercise, you will show that the 3D momentum eigenfunctions $v_{\pvec}(\rvec)$ from [](#e-3D-mom-eigenfunc) are indeed eigenfunctions of the 3D wavefunction momentum operator, 
```{math}
\op{\mathbf{P}}v_{\pvec}(\rvec) = \pvec v_{\pvec}(\rvec).
```